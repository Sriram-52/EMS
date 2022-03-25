const { admin, db } = require('../../utils/admin')
const { emailSender } = require('../../providers/Email')
const JWT = require('../../providers/jwt')
const AuthenticationUTILS = require('./utils')

/* 
    common methods used by the methods in this file are written in utils.js
*/

class Authentication {
	constructor(user) {
		this.actionPerformer = user
	}

	async _session_request() {
		const dbRef = db.collection('SESSION').doc('tracker')
		const FieldValue = admin.firestore.FieldValue
		return dbRef
			.set(
				{
					count: FieldValue.increment(1),
					timeStamp: FieldValue.serverTimestamp(),
				},
				{ merge: true }
			)
			.catch((err) => {
				throw err
			})
	}

	async _reset_password(inputs) {
		const { uid, password } = inputs
		const dbRef = db
			.collection('EMPLOYEES')
			.doc(uid)
			.collection('MODULE_LEVEL_ACCESS')
			.doc('modules')
		const FieldValue = admin.firestore.FieldValue
		return admin
			.auth()
			.updateUser(uid, {
				password: password,
			})
			.then(() => {
				return dbRef.set(
					{ accessibles: FieldValue.arrayUnion('password-changed') },
					{ merge: true }
				)
			})
			.catch((err) => {
				throw err
			})
	}

	async _reset_temp_password(inputs) {
		const { uid, password } = inputs
		const dbRef = db
			.collection('EMPLOYEES')
			.doc(uid)
			.collection('MODULE_LEVEL_ACCESS')
			.doc('modules')
		const FieldValue = admin.firestore.FieldValue
		return admin
			.auth()
			.updateUser(uid, {
				password: password,
			})
			.then(() => {
				return dbRef.set(
					{ accessibles: FieldValue.arrayRemove('password-changed') },
					{ merge: true }
				)
			})
			.catch((err) => {
				throw err
			})
	}

	async _login() {
		const uid = this.actionPerformer.uid
		return admin
			.auth()
			.createCustomToken(uid)
			.then((token) => {
				return this.res.json({ token })
			})
			.catch((err) => {
				console.error(err)
				return this.res.status(401).json({ message: `Invalid authentication` })
			})
	}

	async _validate_invitation_token(token) {
		return AuthenticationUTILS._check_token_expiry(token)
			.then((info) => {
				console.log(info)
				return info
			})
			.catch((err) => {
				throw err
			})
	}

	async _create_employee(inputs) {
		return new Promise((resolve, reject) => {
			const token = inputs.token
			const employeeInfo = inputs.employeeInfo
			let userRef,
				tokenRef,
				emailId,
				prefix,
				currID,
				customID,
				userInfo,
				moduleRef,
				payrollRef,
				companyInfo
			const idRef = db.collection('ID_TRACKER').doc('employees')
			const companyRef = db.collection('COMPANY_CONFIG').doc('details')
			const metaRef = db.collection('META_INFO').doc('employees')
			const batch = db.batch()
			const FieldValue = admin.firestore.FieldValue

			return (
				AuthenticationUTILS._check_token_expiry(token)
					.then((email) => {
						emailId = email
						return AuthenticationUTILS._check_employee_registered_or_not(
							emailId
						)
					})
					.catch((err) => {
						if (err.code === 'auth/user-not-found') {
							// User doesn't exist yet, create it...
							tokenRef = db.collection('INVITATIONS').doc(emailId)
							return companyRef.get()
						}
						throw err
					})
					.then((doc) => {
						// companyInfo = doc.data()
						// prefix = doc.data().companyID.prefix
						prefix = 'EMS'
						return idRef.get()
					})
					.then((doc) => {
						if (!doc.exists) {
							currID = 1
						}
						currID = doc.data().companyID
						customID =
							prefix +
							'0'.repeat(6 - currID.toString().length) +
							currID.toString()
						userRef = db.collection('EMPLOYEES').doc(customID)
						const registeredAt = new Date().toISOString()
						// setting employee collection
						batch.set(userRef, {
							...employeeInfo,
							uid: customID,
							employeeID: customID,
							email: emailId,
							status: 'active',
							role: 'user',
							isDisabled: false,
							isExist: true,
							registeredAt: registeredAt,
						})

						batch.delete(db.collection('EMPLOYEES').doc(emailId))
						// setting up basic modules
						const modules = {
							accessibles: [
								'wiki',
								'task-management',
								'employee-self-services',
								'discussions',
							],
							uid: customID,
						}
						moduleRef = db
							.collection('EMPLOYEES')
							.doc(customID)
							.collection('MODULE_LEVEL_ACCESS')
							.doc('modules')
						batch.set(moduleRef, modules)
						payrollRef = db.collection('PAYROLLS').doc(customID)
						const payrollSettings = AuthenticationUTILS.defaultPayrollSettings()
						batch.set(payrollRef, {
							...payrollSettings,
							isExist: true,
							employeeID: customID,
						})

						// changing status to registered
						batch.update(tokenRef, {
							registeredInfo: {
								isRegistered: true,
								registeredAt: registeredAt,
							},
						})
						return batch.commit()
					})
					.then(() => {
						// waiting for the firestore to update all the data and then creating the user
						return admin.auth().createUser({
							uid: customID,
							email: emailId,
							password: inputs.password,
							displayName: customID,
						})
					})
					// setting the custom claim role as user
					.then((user) => {
						return admin.auth().setCustomUserClaims(user.uid, {
							role: 'user',
						})
					})
					.then(() => {
						// for tracking the employee Id
						if (currID === 1) {
							// when there are no employees the currId will be 1 so setting the document with default data
							return idRef.set({
								companyID: 2,
								active: FieldValue.increment(1),
								inactive: 0,
								suspended: 0,
							})
						}
						return idRef.update({
							companyID: FieldValue.increment(1),
							active: FieldValue.increment(1),
							inactive: FieldValue.increment(-1),
						})
					})
					.then(() => resolve({ emailId, customID }))
					.catch((err) => {
						return reject(err)
					})
			)
		})
	}

	async _forgot_password(email) {
		console.log('_forgot_password')
		return new Promise((resolve, reject) => {
			const actionCodeSettings = {
				url: '',
				handleCodeInApp: false,
			}
			let userInfo
			return admin
				.auth()
				.getUserByEmail(email)
				.then((user) => {
					userInfo = user
					return db.collection('COMPANY_CONFIG').doc('details').get()
				})
				.then((snap) => {
					const details = snap.data()
					actionCodeSettings.url = details.web_url
					return admin
						.auth()
						.generatePasswordResetLink(email, actionCodeSettings)
				})
				.then((resetLink) => {
					const subject = `RESET PASSWORD REQUEST`
					const body = `<div>
                            Hey ${userInfo.displayName}, you have requested to reset your password. Click on the below link to proceed: <br>
                            ${resetLink}
                        </div>`
					return emailSender.openMail(email, subject, body)
				})
				.then(() => resolve())
				.catch((err) => reject(err))
		})
	}

	async _change_password(uid, password) {
		return admin
			.auth()
			.updateUser(uid, {
				password: password,
			})
			.catch((err) => {
				throw err
			})
	}

	async _invite_employee(inputs) {
		console.log('_invite_employee')
		const employeeEmail = inputs.email.toLowerCase()
		const basicInfo = {
			email: employeeEmail,
			personalDetails: inputs.personal,
		}

		const tokenRef = db.collection('INVITATIONS').doc(employeeEmail)

		let isTokenInv = await tokenRef.get().exists

		let userRef = db.collection('EMPLOYEES').doc(employeeEmail)
		const idRef = db.collection('ID_TRACKER').doc('employees')
		const batch = db.batch()
		let newToken
		return (
			AuthenticationUTILS._check_employee_registered_or_not(employeeEmail)
				.catch((err) => {
					if (err.code === 'auth/user-not-found') {
						// User doesn't exist yet, create it...
						return db.collection('EMPLOYEES').doc(employeeEmail).get()
					}
					throw err
				})
				.then((doc) => {
					console.log(`INVITING ${employeeEmail}...`)
					let data
					newToken = JWT.generateToken(employeeEmail)
					const newInvitation = {
						token: newToken,
						invitedBy: this.actionPerformer.uid,
						invitedAt: new Date().toISOString(),
					}
					if (doc.exists && isTokenInv) {
						console.log('Previous Invitations exists')
						data = doc.data()
						// the below condition will occur when a deleted inactive employee,
						// if re invited then the inactive count should be increase
						if (!data.isExist)
							batch.update(idRef, {
								inactive: admin.firestore.FieldValue.increment(1),
							})
						batch.update(tokenRef, {
							invitations: admin.firestore.FieldValue.arrayUnion(newInvitation),
							latestToken: newToken,
						})
						batch.update(userRef, {
							personal: basicInfo.personal,
							isExist: true,
						})
					} else {
						console.log('No Previous Invitations exists')
						data = {
							invitations: [],
							latestToken: '',
							invitee: '',
							registeredInfo: {
								isRegistered: false,
								registeredAt: '',
							},
						}
						data.invitations = [newInvitation]
						data.invitee = employeeEmail
						data.latestToken = newToken
						batch.set(tokenRef, data)
						batch.set(userRef, {
							...basicInfo,
							isExist: true,
							status: 'inActive',
						})
						const FieldValue = admin.firestore.FieldValue
						batch.update(idRef, {
							inactive: FieldValue.increment(1),
						})
					}
					return batch.commit()
				})
				// .then(() => {
				// 	return db.collection('COMPANY_CONFIG').doc('details').get()
				// })
				// .then((doc) => {
				// 	const details = doc.data()
				// 	const web_url = details.web_url
				// 	const invitor = this.actionPerformer.name
				// 	const subject = `INVITATION TO REGISTER IN ${details.companyName.toUpperCase()}`
				// 	const body = `<div>
				//                   ${invitor} is inviting you to register in <b>${details.companyName}</b>. Click on the below link to register:
				//                   <a href='${web_url}/invitations/${newToken}' >
				//                   <button name="button" style="background:#3630a3;color:white; cursor:pointer">Click here to register</button>
				//                   </a>

				//               </div>`
				// 	emailSender.openMail(employeeEmail, subject, body)
				// 	return employeeEmail
				// })
				.catch((err) => {
					throw err
				})
		)
	}

	async _bulk_invite() {
		const excelRef = db.collection('EXCEL_INVITE')
		return db
			.collection('EXCEL_INVITE')
			.get()
			.then((snap) => {
				const employees = snap.docs.map((doc) => doc.data())
				const promises = employees.map((employee) => {
					const { email, branch, dob, firstname, lastname, phonenumber } =
						employee
					const inviteDoc = {
						employeeEmail: email,
						employeeInfo: {
							branch,
							dob,
							firstname,
							lastname,
							phonenumber,
						},
					}
					return this._invite_employee(inviteDoc).catch((err) => err)
				})
				return Promise.all(promises)
			})
			.then((emails) => {
				const promises = emails.map((email) => {
					if (AuthenticationUTILS._check_email_format(email))
						return excelRef.doc(email).update({
							isInviting: false,
							isInvited: true,
							comment: 'Invited',
						})
					return
				})
				return Promise.all(promises)
			})
			.catch((err) => {
				throw err
			})
	}

	async create_custom_token(email) {
		return db
			.collection('EMPLOYEES')
			.where('email', '==', email)
			.where('isExist', '==', true)
			.get()
			.then((snap) => {
				if (snap.size < 1) throw new Error('no-user-exists')
				const user = snap.docs[0].data()
				if (user.status !== 'active') throw new Error('un-authorized')
				return admin.auth().createCustomToken(user.uid, {
					role: user.role,
				})
			})
			.then((token) => {
				return token
			})
			.catch((err) => {
				throw err
			})
	}
}

module.exports = Authentication
