import ACTIONS from '../../actions'
import { dispatcher } from '../../../../utils/functions/dispatcher'
import HttpService from '../../../../utils/http'
import firebase from '../../../../utils/firebase'

export const createTask = (data, callback) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.NEW_TASK_REQ))
	const { payload, projectId } = data
	return HttpService.postRequest({
		url: `/projects/${projectId}/tasks/new`,
		body: payload,
	})
		.then((res) => {
			callback()
			return dispatch(dispatcher(ACTIONS.NEW_PROJECT_SUCCESS, res))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to add task'
			return dispatch(dispatcher(ACTIONS.NEW_PROJECT_FAILURE, errMsg))
		})
}

export const editTask = (data, callback) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.EDIT_TASK_REQ))
	const { projectId, taskId, payload } = data
	return HttpService.putRequest({
		url: `/projects/${projectId}/tasks/${taskId}/update`,
		body: payload,
	})
		.then((res) => {
			callback()
			return dispatch(dispatcher(ACTIONS.EDIT_TASK_SUCCESS, res))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to update task'
			return dispatch(dispatcher(ACTIONS.EDIT_TASK_FAILURE, errMsg))
		})
}

export const loadSelectedTask = (projectId, taskId) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.LOAD_SELECTED_TASK_REQ))
	const unSubscribe = firebase
		.firestore()
		.doc(`PROJECTS/${projectId}/TASKS/${taskId}`)
		.onSnapshot(
			(doc) => {
				if (!doc.exists) throw new Error('no-doc')
				return dispatch(
					dispatcher(ACTIONS.LOAD_SELECTED_TASK_SUCCESS, doc.data())
				)
			},
			(err) => {
				const errMsg = err.message || 'Failed to task'
				return dispatch(dispatcher(ACTIONS.LOAD_SELECTED_TASK_FAILURE, errMsg))
			}
		)
}
