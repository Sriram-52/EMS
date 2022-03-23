const Authentication = require('./model')
const express = require('express')
const router = express.Router()
const { closedEnd } = require('../../endpoints')

router.post('/createemployee', (req, res) => {
	let inputs = req.body
	const authObj = new Authentication(req.user)
	let employeeInfo = inputs.employeeInfo
	let noVal = 0
	const checkKeyValues = () => {
		Object.entries(employeeInfo['employmenthistory'][0]).forEach(
			([key, value]) => {
				if (value === '') noVal++
			}
		)
		if (noVal === Object.keys(employeeInfo['employmenthistory'][0]).length)
			return true
		return false
	}
	if (
		Object.keys(employeeInfo['employmenthistory'][0]).length === 0 ||
		checkKeyValues()
	)
		employeeInfo['employmenthistory'] = []
	inputs.employeeInfo = employeeInfo
	return authObj
		._create_employee(inputs)
		.then(({ emailId, customID }) => {
			return res.json({
				message: `${emailId}(${customID}) registered successfully`,
			})
		})
		.catch((err) => {
			console.error(err)
			if (err.toString().match('token-not-found'))
				return res
					.status(400)
					.json({ message: 'Invalid token', code: 'auth/invalid-token' })
			else if (err.toString().match('token-expired'))
				return res
					.status(500)
					.json({ message: 'Token expired', code: 'auth/token-expired' })
			else if (err.toString().match('already-registered'))
				return res.status(500).json({ message: `Already registered` })
			return res.status(500).json({ message: `Failed to register employee` })
		})
})

router.post('/forgotpassword', (req, res) => {
	const email = req.query.email
	const authObj = new Authentication(req.user)
	return authObj
		._forgot_password(email)
		.then(() => {
			return res.json({ message: `Reset link has sent to the email` })
		})
		.catch((err) => {
			console.error(err)
			if (err.code === 'auth/user-not-found')
				return res
					.status(401)
					.json({ message: `No user found with the requested email` })
			return res
				.status(500)
				.json({ message: `Failed to send the link to the email` })
		})
})

router.post('/changepassword', closedEnd, (req, res) => {
	const { password } = req.body

	if (password.length < 8) {
		console.error('pass-min-length')
		return res
			.status(422)
			.json({ message: `Password must be at least 8 characters length` })
	}
	const authObj = new Authentication(req.user)
	authObj
		._change_password(req.user.uid, password)
		.then(() => {
			return res.json({ message: `Password changed successfully` })
		})
		.catch((err) => {
			console.error(err)
			if (err.toString().match('min-length'))
				return res
					.status(500)
					.json({ message: `Password must be at least 8 characters length` })
			return res.status(500).json({ message: `Failed to update password` })
		})
})

router.post('/inviteemployee', closedEnd, (req, res) => {
	const inputs = req.body
	const authObj = new Authentication(req.user)
	authObj
		._invite_employee(inputs)
		.then((employeeEmail) => {
			return res.json({
				message: `Invitation to ${employeeEmail} sent successfully`,
			})
		})
		.catch((err) => {
			console.error(err)
			if (err.toString().match('already-registered'))
				return res
					.status(500)
					.json({ message: `${inputs.employeeEmail} is already registered` })
			return res
				.status(500)
				.json({ message: `Failed to invite ${inputs.employeeEmail}` })
		})
})

router.post('/bulkinvite', closedEnd, (req, res) => {
	const authObj = new Authentication(req.user)
	authObj
		._bulk_invite()
		.then(() => {
			return res.json({ message: `Bulk invitation completed` })
		})
		.catch((err) => {
			console.error(err)
			return res.status(500).json({ message: `Failed to bulk invite` })
		})
})

router.post('/validateInvitationToken', (req, res) => {
	const authObj = new Authentication(req, res)
	return authObj
		._validate_invitation_token(req.body.token)
		.then((info) => {
			return res.json(info)
		})
		.catch((err) => {
			console.error(err)
			if (err.toString().match('token-not-found'))
				return res
					.status(400)
					.json({ message: 'Invalid token', code: 'auth/invalid-token' })
			else if (err.toString().match('token-expired'))
				return res
					.status(500)
					.json({ message: 'Token expired', code: 'auth/token-expired' })
			return res.status(500).json({
				message: 'Failed to validate token',
				code: 'auth/token-validation-failed',
			})
		})
})

router.get('/customtoken', (req, res) => {
	const { email } = req.query
	const authObj = new Authentication(req.user)
	return authObj
		.create_custom_token(email)
		.then((token) => {
			return res.json({ token })
		})
		.catch((err) => {
			console.error(err)
			if (err.toString().match('no-user-exists'))
				return res
					.status(422)
					.json({ message: `Incorrect username or password` })
			else if (err.toString().match('un-authorized'))
				return res.status(422).json({ message: `Unauthorized` })
			return res.status(500).json({ message: `Failed to create custom token` })
		})
})

router.put('/resetpassword', async (req, res) => {
	const { uid, password } = req.body
	if ([uid, password].includes(undefined))
		return res.status(400).json({ message: 'Invalid inputs' })
	const authObj = new Authentication(req.user)
	return authObj
		._reset_password(req.body)
		.then(() => {
			return res
				.status(200)
				.json({ message: `Password resetted successfully for ${uid}` })
		})
		.catch((err) => {
			console.error(err)
			return res.status(500).json({ message: 'Failed to reset password' })
		})
})

router.put('/resetTempPassword', async (req, res) => {
	const { uid, password } = req.body
	if ([uid, password].includes(undefined))
		return res.status(400).json({ message: 'Invalid password' })
	const authObj = new Authentication(req.user)
	return authObj
		._reset_temp_password(req.body)
		.then(() => {
			return res
				.status(200)
				.json({ message: `Password changed successfully for ${uid}` })
		})
		.catch((err) => {
			console.error(err)
			return res.status(500).json({ message: 'Failed to change password' })
		})
})

module.exports = router
