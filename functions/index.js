const functions = require('firebase-functions')

const config = require('./config.json')

const app = require('express')()

const morgan = require('morgan')
app.use(morgan('dev'))

const cors = require('cors')({ origin: true })
app.use(cors)

const { emailRouter } = require('./providers/Email')
const { loggingRouter } = require('./providers/EventLogger')

app.use('/emails', emailRouter)
app.use('/logger', loggingRouter)

app.use('/auth', require('./services/Authentication/controller'))
app.use('/employee', require('./services/EmployeeManagement/controller'))
app.use('/projects', require('./services/TaskManagement/Project/controller'))
app.use('/projects', require('./services/TaskManagement/Task/controller'))
app.use('/projects', require('./services/TaskManagement/Labels/controller'))
app.use('/wiki', require('./services/WikiMangment/controller'))

exports.api = functions.https.onRequest(app)

const EmployeeStats = require('./providers/Schedulers/Employee/EmployeesInfo')
const {
	ScheduleOverdueList,
	countOverDueList,
} = require('./providers/Schedulers/Tasks/OverdueList')
const {
	countOverDueProjects,
} = require('./providers/Schedulers/Projects/OverdueList')

exports.scheduler = functions.pubsub
	.schedule('0 11 * * *')
	.timeZone(config.timeformat.timeZone)
	.onRun(() => {
		// daily at 11
		// employee stats, overdue tasks
		EmployeeStats()
		ScheduleOverdueList()
		countOverDueList()
		countOverDueProjects()
	})

const {
	projectOnCreate,
	projectOnUpdate,
	taskOnCreate,
	taskOnUpdate,
} = require('./providers/Triggers/taskManagment')

exports.projectDocCreateTrigger = functions.firestore
	.document('PROJECTS/{docId}')
	.onCreate((snap, context) => {
		return projectOnCreate(snap.data())
	})

exports.projectDocUpdateTrigger = functions.firestore
	.document('PROJECTS/{docId}')
	.onUpdate((change, context) => {
		return projectOnUpdate(change)
	})

exports.taskManagementTrigger = functions.firestore
	.document('PROJECTS/{projectId}/TASKS/{taskId}')
	.onCreate((snap, context) => {
		return taskOnCreate(snap, context)
	})

exports.taskManagementUpdateTrigger = functions.firestore
	.document('PROJECTS/{projectId}/TASKS/{taskId}')
	.onUpdate((change, context) => {
		return taskOnUpdate(change, context)
	})

const {
	employeeProfileOnUpdate,
	employeeOnCreate,
} = require('./providers/Triggers/employeeList')

exports.employeeManagmentTrigger = functions.firestore
	.document('EMPLOYEES/{uid}')
	.onUpdate((change, context) => {
		return employeeProfileOnUpdate(change, context)
	})

exports.employeeCreateTrigger = functions.firestore
	.document('EMPLOYESS/{uid}')
	.onCreate((snap, context) => {
		return employeeOnCreate(snap, context)
	})
