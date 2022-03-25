const { admin, db } = require('./utils/admin')

const closedEnd = (req, res, next) => {
	let idToken, uid
	if (req.headers.authorization) {
		// Bearer:some_uid token
		idToken = req.headers.authorization.split(' ')[1] // token
	} else {
		console.log('No Token Found')
		return res.status(401).json({ message: `Unauthorized` })
	}

	return admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			return db.collection(`EMPLOYEES`).doc(decodedToken.uid).get()
		})
		.then((doc) => {
			const userData = doc.data()
			const name = [
				userData.personalDetails.firstName,
				userData.personalDetails.middleName,
				userData.personalDetails.lastName,
			]
				.filter((t) => t !== '')
				.join(' ')
			req.user = {
				uid: userData.uid,
				name: name,
			}
			console.log(`${req.user.uid}(${req.user.name}) --> ${req.originalUrl}`)
			return next()
		})
		.catch((err) => {
			console.error(err)
			return res
				.status(500)
				.json({ message: `Error occured please make a refresh` })
		})
}

module.exports = { closedEnd }
