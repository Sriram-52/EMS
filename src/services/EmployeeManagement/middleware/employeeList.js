import { dispatcher } from '../../../utils/functions/dispatcher'
import ACTIONS from '../actions'
import firebase from '../../../utils/firebase'

export const loadAllEmployees = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.LOAD_ALL_EMPLOYEES_REQ))
	return firebase
		.firestore()
		.collection('EMPLOYEES')
		.where('isExist', '==', true)
		.onSnapshot(
			(querySnapshot) => {
				const employees = {}
				querySnapshot.docs.forEach((doc) => {
					employees[doc.id] = doc.data()
				})
				return dispatch(
					dispatcher(ACTIONS.LOAD_ALL_EMPLOYEES_SUCCESS, employees)
				)
			},
			(err) => {
				const errMsg = err.message || 'Failed to load all employees'
				return dispatch(dispatcher(ACTIONS.LOAD_ALL_EMPLOYEES_FAILURE, errMsg))
			}
		)
}

export const loadActiveEmployees = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.LOAD_ACTIVE_EMPLOYEES_REQ))
	return firebase
		.firestore()
		.collection('EMPLOYEES')
		.where('isExist', '==', true)
		.where('status', '==', 'active')
		.onSnapshot(
			(querySnapshot) => {
				const employees = {}
				querySnapshot.docs.forEach((doc) => {
					employees[doc.id] = doc.data()
				})
				return dispatch(
					dispatcher(ACTIONS.LOAD_ACTIVE_EMPLOYEES_SUCCESS, employees)
				)
			},
			(err) => {
				const errMsg = err.message || 'Failed to load all employees'
				return dispatch(
					dispatcher(ACTIONS.LOAD_ACTIVE_EMPLOYEES_FAILURE, errMsg)
				)
			}
		)
}

export const loadInActiveEmployees = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.LOAD_INACTIVE_EMPLOYEES_REQ))
	return firebase
		.firestore()
		.collection('EMPLOYEES')
		.where('isExist', '==', true)
		.where('status', '==', 'inActive')
		.onSnapshot(
			(querySnapshot) => {
				const employees = {}
				querySnapshot.docs.forEach((doc) => {
					employees[doc.id] = doc.data()
				})
				return dispatch(
					dispatcher(ACTIONS.LOAD_INACTIVE_EMPLOYEES_SUCCESS, employees)
				)
			},
			(err) => {
				const errMsg = err.message || 'Failed to load all employees'
				return dispatch(
					dispatcher(ACTIONS.LOAD_INACTIVE_EMPLOYEES_FAILURE, errMsg)
				)
			}
		)
}

export const loadSuspendedEmployees = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.LOAD_SUSPENDED_EMPLOYEES_REQ))
	return firebase
		.firestore()
		.collection('EMPLOYEES')
		.where('isExist', '==', true)
		.where('status', '==', 'suspended')
		.onSnapshot(
			(querySnapshot) => {
				const employees = {}
				querySnapshot.docs.forEach((doc) => {
					employees[doc.id] = doc.data()
				})
				return dispatch(
					dispatcher(ACTIONS.LOAD_SUSPENDED_EMPLOYEES_SUCCESS, employees)
				)
			},
			(err) => {
				const errMsg = err.message || 'Failed to load all employees'
				return dispatch(
					dispatcher(ACTIONS.LOAD_SUSPENDED_EMPLOYEES_FAILURE, errMsg)
				)
			}
		)
}
