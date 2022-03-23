const { admin, db } = require('../utils/admin')
const express = require('express')
const loggingRouter = express.Router()
const { closedEnd } = require('../endpoints')

class Transaction {
	_add_record(details) {
		const { employeeID, username, amount, role, eventDetails } = details
		const dbRef = db.collection(`EMPLOYEES/${employeeID}/TRANSACTIONS`).doc()
		return dbRef
			.set({
				employeeID,
				username,
				amount,
				eventDetails,
				role,
				id: dbRef.id,
				createdAt: new Date().toISOString(),
			})
			.then(() => {
				return dbRef.id
			})
	}
}

class History {
	_add_employee_record(details) {
		const { actionBy, type, subject, eventDetails } = details
		const dbRef = db.collection(`EMPLOYEES/${actionBy}/HISTORY`).doc()
		return dbRef.set({
			actionBy,
			type,
			subject,
			eventDetails,
			id: dbRef.id,
			createdAt: new Date().toISOString(),
		})
	}

	_add_project_record(details) {
		const { actionBy, type, subject, eventDetails } = details
		const dbRef = db
			.collection(`PROJECTS/${subject.pid}/PROJECT_TIMELINE`)
			.doc()
		return dbRef.set({
			actionBy,
			type,
			subject,
			eventDetails,
			id: dbRef.id,
			createdAt: new Date().toISOString(),
		})
	}

	_add_task_record(details) {
		const { actionBy, type, subject, eventDetails } = details
		const dbRef = db
			.collection(`PROJECTS/${subject.pid}/TASKS/${subject.tid}/TASK_TIMELINE`)
			.doc()
		return dbRef.set({
			actionBy,
			type,
			subject,
			eventDetails,
			id: dbRef.id,
			createdAt: new Date().toISOString(),
		})
	}
}

const logToTransaction = (details) => new Transaction()._add_record(details)
const logToHistory = (details) => new History()._add_employee_record(details)
const logToProjectTimeLine = (details) =>
	new History()._add_project_record(details)
const logToTaskTimeline = (details) => new History()._add_task_record(details)

loggingRouter.post('/history', closedEnd, (req, res) => {
	const { actionBy, type, subject, eventDetails } = req.body
	const details = {
		actionBy,
		type,
		subject,
		eventDetails,
	}
	return logToHistory(details)
		.then(() => {
			return res.json({ message: 'Logged the record successfully' })
		})
		.catch((err) => {
			console.error(err)
			return res.status(500).json({ message: `Failed to log the record` })
		})
})

module.exports = {
	logToTransaction,
	logToHistory,
	logToProjectTimeLine,
	logToTaskTimeline,
	loggingRouter,
}
