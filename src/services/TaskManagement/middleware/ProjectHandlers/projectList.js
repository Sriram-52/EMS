import firebase from '../../../../utils/firebase'
import ACTIONS from '../../actions'
import { dispatcher } from '../../../../utils/functions/dispatcher'

export const loadAllProjects = () => (dispatch, getState) => {
	dispatch(dispatcher(ACTIONS.LOAD_ALL_PROJECTS_REQ))
	const modules = getState().employee.default.modules.data
	const uid = firebase.auth().currentUser.uid
	const unSubscribe = firebase
		.firestore()
		.collection('PROJECTS')
		.where('isExist', '==', true)
		.onSnapshot(
			(querySnapshot) => {
				const projects = {}
				querySnapshot.docs
					.filter(
						(doc) =>
							uid in doc.data().Users ||
							modules.includes('console-customization') ||
							modules.includes('task-management-manager')
					)
					.forEach((doc) => {
						projects[doc.id] = doc.data()
					})

				return dispatch(dispatcher(ACTIONS.LOAD_ALL_PROJECTS_SUCCESS, projects))
			},
			(err) => {
				console.error(err)
				const errMsg = err.message || 'Failed to get projects'
				return dispatch(dispatcher(ACTIONS.LOAD_ALL_PROJECTS_FAILURE, errMsg))
			}
		)
}

export const loadInProgressProjects = () => (dispatch, getState) => {
	dispatch(dispatcher(ACTIONS.LOAD_INPROGRESS_PROJECTS_REQ))
	const modules = getState().employee.default.modules.data
	const uid = firebase.auth().currentUser.uid
	const unSubscribe = firebase
		.firestore()
		.collection('PROJECTS')
		.where('isExist', '==', true)
		.where('status', '==', 'Open')
		.onSnapshot(
			(querySnapshot) => {
				const projects = {}
				querySnapshot.docs
					.filter(
						(doc) =>
							uid in doc.data().Users ||
							modules.includes('console-customization') ||
							modules.includes('task-management-manager')
					)
					.forEach((doc) => {
						projects[doc.id] = doc.data()
					})

				return dispatch(
					dispatcher(ACTIONS.LOAD_INPROGRESS_PROJECTS_SUCCESS, projects)
				)
			},
			(err) => {
				console.error(err)
				const errMsg = err.message || 'Failed to get projects'
				return dispatch(
					dispatcher(ACTIONS.LOAD_INPROGRESS_PROJECTS_FAILURE, errMsg)
				)
			}
		)
}

export const loadClosedProjects = () => (dispatch, getState) => {
	dispatch(dispatcher(ACTIONS.LOAD_CLOSED_PROJECTS_REQ))
	const modules = getState().employee.default.modules.data
	const uid = firebase.auth().currentUser.uid
	const unSubscribe = firebase
		.firestore()
		.collection('PROJECTS')
		.where('isExist', '==', true)
		.where('status', '==', 'Closed')
		.onSnapshot(
			(querySnapshot) => {
				const projects = {}
				querySnapshot.docs
					.filter(
						(doc) =>
							uid in doc.data().Users ||
							modules.includes('console-customization') ||
							modules.includes('task-management-manager')
					)
					.forEach((doc) => {
						projects[doc.id] = doc.data()
					})

				return dispatch(
					dispatcher(ACTIONS.LOAD_CLOSED_PROJECTS_SUCCESS, projects)
				)
			},
			(err) => {
				console.error(err)
				const errMsg = err.message || 'Failed to get projects'
				return dispatch(
					dispatcher(ACTIONS.LOAD_CLOSED_PROJECTS_FAILURE, errMsg)
				)
			}
		)
}

export const loadOverDueProjects = () => (dispatch, getState) => {
	dispatch(dispatcher(ACTIONS.LOAD_OVERDUE_PROJECTS_REQ))
	const modules = getState().employee.default.modules.data
	const uid = firebase.auth().currentUser.uid
	const unSubscribe = firebase
		.firestore()
		.collection('PROJECTS')
		.where('isExist', '==', true)
		.onSnapshot(
			(querySnapshot) => {
				const projects = {}
				querySnapshot.docs
					.filter((doc) => {
						const item = doc.data()
						return (
							(uid in item.Users ||
								modules.includes('console-customization') ||
								modules.includes('task-management-manager')) &&
							item.isExist &&
							item.status === 'open' &&
							new Date(item.endDate) < new Date() &&
							new Date(item.startDate) < new Date()
						)
					})
					.forEach((doc) => {
						projects[doc.id] = doc.data()
					})

				return dispatch(
					dispatcher(ACTIONS.LOAD_OVERDUE_PROJECTS_SUCCESS, projects)
				)
			},
			(err) => {
				console.error(err)
				const errMsg = err.message || 'Failed to get projects'
				return dispatch(
					dispatcher(ACTIONS.LOAD_OVERDUE_PROJECTS_FAILURE, errMsg)
				)
			}
		)
}
