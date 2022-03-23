const jwt = require('jsonwebtoken')
const PRIVATE_KEY =
	'd600baf03987021dc8decae0183419c845284627a78d602c9aface022e86b86effd987bcb8336cbde19f097ba927660c095ed448b55861161286333edf46a186'
const jwt_sign = jwt.sign
const jwt_decode = jwt.decode
const jwt_verify = jwt.verify

class JWT {
	generateToken(email) {
		try {
			const token = jwt_sign({ email: email }, PRIVATE_KEY, {
				expiresIn: '24h',
			})
			return token
		} catch (error) {
			console.log(error)
		}
	}

	verifyToken(token) {
		try {
			const info = jwt_verify(token, PRIVATE_KEY)
			return {
				status: true,
				info: info,
			}
		} catch (error) {
			return {
				status: false,
				error: error,
			}
		}
	}

	decodeToken(token) {
		// dont use it unless the source is trusted
		try {
			return jwt_decode(token)
		} catch (error) {
			console.log(error)
		}
	}
}

module.exports = new JWT()
