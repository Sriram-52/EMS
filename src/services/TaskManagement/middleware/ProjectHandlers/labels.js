import HttpService from '../../../../utils/http'
import ACTIONS from '../../actions'
import { dispatcher } from '../../../../utils/functions/dispatcher'

export const createLabels =
	(payload, projectId, resolve, reject) => (dispatch) => {
		dispatch(dispatcher(ACTIONS.CREATE_LABELS_REQ))
		return HttpService.postRequest({
			url: `/projects/${projectId}/labels/newlabel`,
			body: payload,
		})
			.then((res) => {
				resolve()
				return dispatch(dispatcher(ACTIONS.CREATE_LABELS_SUCCESS, res))
			})
			.catch((err) => {
				reject()
				const errMsg = err.message || 'Failed to add label'
				return dispatch(dispatcher(ACTIONS.CREATE_LABELS_FAILURE, errMsg))
			})
	}

export const updateLabels = (data, resolve, reject) => (dispatch) => {
	const { payload, projectId, labelId } = data
	dispatch(dispatcher(ACTIONS.UPDATE_LABELS_REQ))
	return HttpService.putRequest({
		url: `/projects/${projectId}/labels/${labelId}/update`,
		body: payload,
	})
		.then((res) => {
			resolve()
			return dispatch(dispatcher(ACTIONS.UPDATE_LABELS_SUCCESS, res))
		})
		.catch((err) => {
			reject()
			const errMsg = err.message || 'Failed to update label'
			return dispatch(dispatcher(ACTIONS.UPDATE_LABELS_FAILURE, errMsg))
		})
}

export const deleteLabels = (data, resolve, reject) => (dispatch) => {
	const { projectId, labelId } = data
	dispatch(dispatcher(ACTIONS.DELETE_LABELS_REQ))
	return HttpService.deleteRequest({
		url: `/projects/${projectId}/labels/${labelId}/delete`,
	})
		.then((res) => {
			resolve()
			return dispatch(dispatcher(ACTIONS.DELETE_LABELS_SUCCESS, res))
		})
		.catch((err) => {
			reject()
			const errMsg = err.message || 'Failed to delete labels'
			return dispatch(dispatcher(ACTIONS.DELETE_LABELS_FAILURE, errMsg))
		})
}
