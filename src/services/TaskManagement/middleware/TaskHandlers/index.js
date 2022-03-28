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

export const getComments = (projectId, taskId) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.GET_COMMENTS_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection(`PROJECTS/${projectId}/TASKS/${taskId}/TASK_COMMENTS`)
		.where('isExist', '==', true)
		.onSnapshot(
			(querySnapshot) => {
				const comments = {}
				querySnapshot.docs.forEach((doc) => {
					comments[doc.id] = doc.data()
				})
				return dispatch(
					dispatcher(ACTIONS.GET_COMMENTS_SUCCESS, { ...comments })
				)
			},
			(err) => {
				const errMsg = err.message || 'Failed to get comments'
				return dispatch(dispatcher(ACTIONS.GET_COMMENTS_FAILURE, errMsg))
			}
		)
}

export const newComment =
	(payload, projectId, taskId, callback) => (dispatch) => {
		dispatch(dispatcher(ACTIONS.NEW_COMMENT_REQ))
		return HttpService.postRequest({
			url: `/projects/${projectId}/tasks/${taskId}/comments/new`,
			body: payload,
		})
			.then((res) => {
				callback()
				return dispatch(dispatcher(ACTIONS.NEW_COMMENT_SUCCESS, res))
			})
			.catch((err) => {
				const errMsg = err.message || 'Failed to comment'
				return dispatch(dispatcher(ACTIONS.NEW_COMMENT_FAILURE, errMsg))
			})
	}

export const updateComment =
	(payload, projectId, taskId, commentId, callback) => (dispatch) => {
		dispatch(dispatcher(ACTIONS.UPDATE_COMMENT_REQ))
		return HttpService.putRequest({
			url: `/projects/${projectId}/tasks/${taskId}/comments/${commentId}/update`,
			body: payload,
		})
			.then((res) => {
				callback()
				return dispatch(dispatcher(ACTIONS.UPDATE_COMMENT_SUCCESS, res))
			})
			.catch((err) => {
				const errMsg = err.message || 'Failed to update comment'
				return dispatch(dispatcher(ACTIONS.UPDATE_COMMENT_FAILURE, errMsg))
			})
	}

export const deleteComment =
	(projectId, taskId, commentId, callback) => (dispatch) => {
		dispatch(dispatcher(ACTIONS.DELETE_COMMENT_REQ))
		return HttpService.deleteRequest({
			url: `/projects/${projectId}/tasks/${taskId}/comments/${commentId}/delete`,
		})
			.then((res) => {
				callback()
				return dispatch(dispatcher(ACTIONS.DELETE_COMMENT_SUCCESS, res))
			})
			.catch((err) => {
				const errMsg = err.message || 'Failed to delete comment'
				return dispatch(dispatcher(ACTIONS.DELETE_COMMENT_FAILURE, errMsg))
			})
	}

export const loadTaskTimeLine = (projectID, taskID) => (dispatch) => {
	console.log('Project-Timeline')
	dispatch(dispatcher(ACTIONS.LOAD_TASK_TIMELINE_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection(`PROJECTS/${projectID}/TASKS/${taskID}/TASK_TIMELINE`)
		.orderBy('createdAt', 'desc')
		.onSnapshot(
			(snap) => {
				const data = {}
				snap.docs.forEach((doc) => {
					data[doc.id] = doc.data()
				})
				return dispatch(dispatcher(ACTIONS.LOAD_TASK_TIMELINE_SUCCESS, data))
			},
			(err) => {
				console.error(err)
				const msg = 'Failed To Load  Project Timeline'
				errorMsg(msg)
				return dispatch(dispatcher(ACTIONS.LOAD_TASK_TIMELINE_FAILURE, msg))
			}
		)
}
