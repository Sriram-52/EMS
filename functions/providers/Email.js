const nodeoutlook = require('nodejs-nodemailer-outlook')
const express = require('express')
const emailRouter = express.Router()
const EmployeeManagementUTILS = require('../services/EmployeeManagement/utils')
const { admin, db } = require('../utils/admin')
const config = require('../config.json')

const optionsForMail = {
	from: 'no-reply <noreply@flairtechno.com',
	auth: {
		user: 'noreply@flairtechno.com',
		pass: 'Ironm@n4748TF',
	},
	replyTo: 'No-Reply@flairtechno.com',
	// host: 'smtp.gmail.com',
	host: 'smtp-mail.outlook.com', // hostname
	secureConnection: false, // TLS requires secureConnection to be false
	port: 587, // port for secure SMTP
	tls: {
		rejectUnauthorized: false,
	},
}

const header = (content, company_logo) => {
	return `<div style="display: flex; justify-content: space-around; margin-bottom: 20px">
                          <div>
                              <img height="70" src=${company_logo} >
                          </div>
                          <div style="background: black; padding: 10px; width: 100%; height: 18px; margin: 22px 0 0 22px; border-radius: 8px; color:white; text-align: center" >
                          ${content}
                          </div>
                          </div>`
}
const footer = () => `<div>
                        <p>Thanks & Regards,</p>
                        <br/><br/>
                        <div style="margin-top: 20px; background: black; display: flex; justify-content:space-between">
                            <div style="margin-left:auto" >
                                <span style="color:white; font-size: 10px" >Powered by</span>
                                <img height="30" src=${config.ownerlogo} >
                            </div>
                        </div>
                    </div>`

const loginLine = (web_url) => `<p>
                        Please
                        <a
                            href='${web_url}'
                            target="_blank"
                            style="background-color:#212121;color:white;padding:5px;border-radius: 4px;text-decoration: none"
                            >Login
                        </a>
                        to get to know.
                        </p>`

class Email {
	constructor() {
		this.loadCompanyDetails = db
			.collection('COMPANY_CONFIG')
			.doc('details')
			.get()
		this.details = {}
	}

	async set_company_details() {
		const details = await this.loadCompanyDetails
		this.details = details.data()
	}

	mailFunction(to, subject, body) {
		return new Promise((resolve, reject) => {
			console.log(`SENDING EMAIL TO: ${to}`)
			nodeoutlook.sendEmail({
				...optionsForMail,
				to: to,
				subject: subject,
				html: `
							${header(`${subject}`, this.details.images.companyLogo)}
							${body} 
							${footer()}
					`,
				onError: (err) => {
					console.log(err)
					reject(err)
				},
				onSuccess: (i) => {
					console.log('EMAIL SENT TO: ' + to)
					resolve(true)
				},
			})
		})
	}

	async openMail(users, subject, body) {
		await this.set_company_details()
		if (typeof users === 'string') {
			users = [users]
		}
		const promises = []
		users.forEach((user) => {
			const promise = this.mailFunction(user, subject, body)
			promises.push(promise)
		})
		return Promise.all(promises)
	}

	async closedMail(users, subject, body) {
		await this.set_company_details()
		if (typeof users === 'string') {
			users = [users]
		}
		const promises = []
		users.forEach(async (user) => {
			try {
				const employee = await EmployeeManagementUTILS._get_employee(user)
				const promise = this.mailFunction(employee.email, subject, body)
				promises.push(promise)
			} catch (error) {
				console.error(error)
			}
		})
		return Promise.all(promises)
	}

	async categorisedMail(subject, body, to = [], cc = [], bcc = []) {
		await this.set_company_details()
		return new Promise((resolve, reject) => {
			console.log(
				`SENDING EMAIL TO: ${
					'to -->' +
					to.join(',') +
					'\n cc --> ' +
					cc.join(',') +
					'\n bcc --> ' +
					bcc.join(',')
				}`
			)
			nodeoutlook.sendEmail({
				...optionsForMail,
				to: to.join(','),
				cc: cc.join(','),
				bcc: bcc.join(','),
				subject: subject,
				html: `
						${header(`${subject}`, this.details.images.companyLogo)}
						${body} 
						${footer()}
				`,
				onError: (err) => {
					console.log(err)
					reject(err)
				},
				onSuccess: (i) => {
					console.log(
						`EMAIL SENT TO: ${
							'to -->' +
							to.join(',') +
							'\n cc --> ' +
							cc.join(',') +
							'\n bcc --> ' +
							bcc.join(',')
						}`
					)
					resolve(true)
				},
			})
		})
	}

	async sendCustomMail(type, subject, body, user) {
		await this.set_company_details()
		return new Promise((resolve, reject) => {
			console.log(`SENDING ${type} EMAIL TO: ${user}`)
			nodeoutlook.sendEmail({
				...optionsForMail,
				[type]: user,
				subject: subject,
				html: `
						${header(subject, this.details.images.companyLogo)}
						${body} 
						${footer()}
				`,
				onError: (err) => {
					console.log(err)
					reject(err)
				},
				onSuccess: (i) => {
					console.log('EMAIL SENT TO: ' + to)
					resolve(true)
				},
			})
		})
	}
}

const emailSender = new Email()

emailRouter.post('/:type/send', (req, res) => {
	const { to, cc = [], bcc = [], subject, body } = req.body
	const { type } = req.params

	return process()
		.then(() => {
			return res.json({ message: `Email sent successfully` })
		})
		.catch((err) => {
			console.error(err)
			return res.status(500).json({ message: `Failed to send email` })
		})

	function process() {
		if (type === 'open') return emailSender.openMail(to, subject, body)
		else if (type === 'closed') return emailSender.closedMail(to, subject, body)
		else if (type === 'categorised')
			return emailSender.categorisedMail(subject, body, to, cc, bcc)
		throw new Error('invalid-type')
	}
})

module.exports = { emailSender, emailRouter }
