import firebase from '../../../../utils/firebase'
import ACTIONS from '../../actions'
import { dispatcher } from '../../../../utils/functions/dispatcher'

export const loadAllTasks = (projectID) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.LOAD_ALL_TASKS_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection(`PROJECTS/${projectID}/TASKS`)
		.where('isExist', '==', true)
		.orderBy('createdAt', 'desc')
		.onSnapshot(
			(snap) => {
				const data = {}
				snap.docs.forEach((doc) => {
					data[doc.id] = doc.data()
				})
				return dispatch(dispatcher(ACTIONS.LOAD_ALL_TASKS_SUCCESS, data))
			},
			(err) => {
				console.error(err)
				const msg = 'Failed to load  All Tasks'
				return dispatch(dispatcher(ACTIONS.LOAD_ALL_TASKS_FAILURE, msg))
			}
		)
}

export const loadOpenTasks = (projectID) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.LOAD_OPEN_TASKS_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection(`PROJECTS/${projectID}/TASKS`)
		.where('isExist', '==', true)
		.where('status', '==', 'Open')
		.orderBy('createdAt', 'desc')
		.onSnapshot(
			(snap) => {
				const data = {}
				snap.docs.forEach((doc) => {
					data[doc.id] = doc.data()
				})
				return dispatch(dispatcher(ACTIONS.LOAD_OPEN_TASKS_SUCCESS, data))
			},
			(err) => {
				console.error(err)
				const msg = 'Failed to load  Open Tasks'
				return dispatch(dispatcher(ACTIONS.LOAD_OPEN_TASKS_FAILURE, msg))
			}
		)
}

export const loadInProgressTasks = (projectID) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.LOAD_INPROGRESS_TASKS_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection(`PROJECTS/${projectID}/TASKS`)
		.where('isExist', '==', true)
		.where('status', '==', 'InProgress')
		.orderBy('createdAt', 'desc')
		.onSnapshot(
			(snap) => {
				const data = {}
				snap.docs.forEach((doc) => {
					data[doc.id] = doc.data()
				})
				return dispatch(dispatcher(ACTIONS.LOAD_INPROGRESS_TASKS_SUCCESS, data))
			},
			(err) => {
				console.error(err)
				const msg = 'Failed to load  InProgress Tasks'
				return dispatch(dispatcher(ACTIONS.LOAD_INPROGRESS_TASKS_FAILURE, msg))
			}
		)
}

export const loadOverDueTasks = (projectID) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.LOAD_OVERDUE_TASKS_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection(`PROJECTS/${projectID}/TASKS`)
		.orderBy('createdAt', 'desc')
		.onSnapshot(
			(snap) => {
				const data = {}
				snap.docs
					.filter((doc) => {
						const item = doc.data()
						return (
							new Date(item.startdate) < new Date() &&
							new Date(item.enddate) < new Date() &&
							item.status !== 'Completed' &&
							item.status !== 'Review' &&
							item.status !== 'Closed' &&
							item.isExist === true
						)
					})
					.forEach((doc) => {
						data[doc.id] = doc.data()
					})
				return dispatch(dispatcher(ACTIONS.LOAD_OVERDUE_TASKS_SUCCESS, data))
			},
			(err) => {
				console.error(err)
				const msg = 'Failed to load OverDue Tasks'
				return dispatch(dispatcher(ACTIONS.LOAD_OVERDUE_TASKS_FAILURE, msg))
			}
		)
}

export const loadReviewTasks = (projectID) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.LOAD_REVIEW_TASKS_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection(`PROJECTS/${projectID}/TASKS`)
		.where('isExist', '==', true)
		.where('status', '==', 'Review')
		.orderBy('createdAt', 'desc')
		.onSnapshot(
			(snap) => {
				const data = {}
				snap.docs.forEach((doc) => {
					data[doc.id] = doc.data()
				})
				return dispatch(dispatcher(ACTIONS.LOAD_REVIEW_TASKS_SUCCESS, data))
			},
			(err) => {
				console.error(err)
				const msg = 'Failed to load  Review Tasks'
				return dispatch(dispatcher(ACTIONS.LOAD_REVIEW_TASKS_FAILURE, msg))
			}
		)
}

export const loadClosedTasks = (projectID) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.LOAD_CLOSED_TASKS_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection(`PROJECTS/${projectID}/TASKS`)
		.where('isExist', '==', true)
		.where('status', '==', 'Closed')
		.orderBy('createdAt', 'desc')
		.onSnapshot(
			(snap) => {
				const data = {}
				snap.docs.forEach((doc) => {
					data[doc.id] = doc.data()
				})
				return dispatch(dispatcher(ACTIONS.LOAD_CLOSED_TASKS_SUCCESS, data))
			},
			(err) => {
				console.error(err)
				const msg = 'Failed to load Closed Tasks'
				return dispatch(dispatcher(ACTIONS.LOAD_CLOSED_TASKS_FAILURE, msg))
			}
		)
}
