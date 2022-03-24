import { configuration } from '../../config'

class Validations {
	// for checking valid name or not

	currencyFormatterUs = (money) => {
		try {
			return new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(money)
		} catch (error) {
			console.error(error)
			return money
		}
	}

	checkName = (name) => {
		const exp = /^[a-zA-Z .]{1,}$/
		if (name.length) return exp.test(name.trim())
		return true
	}

	checkNumber = (number) => {
		const exp = /\D+/g
		const expForChar = /^\d+$/
		if (number.length === 0) return true
		if (!expForChar.test(number.trim())) return false
		let clearNum = number.replace(exp, '')
		return clearNum.length === 10
	}

	checkZip = (number) => {
		const exp = /\D+/g
		const expForChar = /^\d+$/
		if (!expForChar.test(number.trim())) return false
		let clearNum = number.replace(exp, '')
		return clearNum.length > 4 && clearNum.length < 9
	}

	checkFloatNumber = (number) => {
		const exp = /\D+/g
		const expForChar = /[\d.][\d.]/
		if (!expForChar.test(number.trim())) return false
		let clearNum = number.replace(exp, '')
		return clearNum.length < 5
	}

	checkDateDiff = (startdate, enddate) => {
		return new Date(enddate) - new Date(startdate) >= 0 ? true : false
	}

	checkEmail = (email) => {
		const exp =
			/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		try {
			if (email.length === 0) return false
			return exp.test(email.toLowerCase().trim())
		} catch (error) {
			return false
		}
	}

	checkWebsite = (website) => {
		const exp =
			/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/
		try {
			return exp.test(website.toLowerCase().trim())
		} catch (error) {
			return false
		}
	}

	checkAddress = (address) => {
		return address.trim().length > 0
	}

	nameFormatterToUpperCase = (name) => {
		try {
			let upperCaseFormate = name.toLowerCase().split(' ')
			for (let i = 0; i < upperCaseFormate.length; i++) {
				upperCaseFormate[i] =
					upperCaseFormate[i].charAt(0).toUpperCase() +
					upperCaseFormate[i].substring(1)
			}
			return upperCaseFormate.join(' ')
		} catch (error) {
			return ''
		}
	}
	checkDate = (date) => {
		if (date !== '' || date !== null) {
			const dateRegexp =
				/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/
			if (dateRegexp.test(date)) {
				return true
			} else {
				return false
			}
		} else {
			return false
		}
	}

	dateFormatter = (date) => {
		let final = ''
		try {
			final = Intl.DateTimeFormat(
				configuration['date-code'],
				configuration.dateformat
			).format(new Date(date))
		} catch (error) {
			final = date
		}
		return final
	}

	dateWithNoTime = (date) => {
		let final = ''
		try {
			const year = new Date(date).getFullYear()
			const month = new Date(date).getMonth()
			const day = new Date(date).getDate()
			final = new Date(year, month, day)
		} catch (error) {
			final = date
		}
		return final
	}

	dateAndTimeFormatter = (timestamp) => {
		let final = ''
		try {
			final = Intl.DateTimeFormat(configuration['date-code'], {
				...configuration.dateformat,
				...configuration.timeformat,
			}).format(new Date(timestamp))
		} catch (error) {
			final = timestamp
		}
		return final
	}

	getQueryParameter = (param) => {
		const urlParams = new URLSearchParams(window.location.search)
		return urlParams.get(param)
	}
}

export default new Validations()
