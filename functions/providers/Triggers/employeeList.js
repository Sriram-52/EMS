const { db, admin } = require('../../utils/admin')

async function employeeProfileOnUpdate(change, context) {
	const idRef = db.collection('META_INFO').doc('employees')
	const countRef = db.collection('ID_TRACKER').doc('employees')
	const { uid } = context.params
	const { imageURL = '', role = '', status = '' } = change.after.data()
	const {
		firstname = '',
		middlename = '',
		lastname = '',
		gender = '',
		department = '',
		branch = '',
		emailId = '',
		supervisor = false,
		category = '',
	} = change.after.data().personal
	const formattedName = [firstname, middlename, lastname]
		.filter((item) => item !== '')
		.join(' ')
	const metaDoc = {
		uid: uid,
		name: formattedName,
		email: emailId,
		photoURL: imageURL,
		isSupervisor: supervisor,
		designation: role,
		jobtitle: '',
		status: status,
		companyID: uid,
		gender,
		department,
		category,
		branch,
	}
	return idRef
		.set({ [uid]: metaDoc }, { merge: true })
		.then(() => {
			console.log(`updated for ${uid}`)
			if (change.after.data().status !== change.before.data().status) {
				return countRef.set(
					{
						tracker: {
							[status]: admin.firestore.FieldValue.increment(1),
							[change.before.data().status]:
								admin.firestore.FieldValue.increment(-1),
						},
					},
					{ merge: true }
				)
			}
			if (!change.after.data().isExist) {
				return countRef.set(
					{
						tracker: {
							[status]: admin.firestore.FieldValue.increment(-1),
							all: admin.firestore.FieldValue.increment(-1),
						},
					},
					{ merge: true }
				)
			}
			return
		})
		.catch((err) => {
			console.error(err)
		})
}

async function employeeOnCreate(snap, context) {
	const countRef = db.collection('ID_TRACKER').doc('employees')
	const { status } = snap.data()
	const FieldValue = admin.firestore.FieldValue
	return countRef
		.set({ tracker: { [status]: FieldValue.increment(1) } }, { merge: true })
		.then(() => {
			console.log(`Added in ${status}`)
			return
		})
		.catch((err) => {
			console.log(err)
		})
}

module.exports = { employeeProfileOnUpdate, employeeOnCreate }
