import ACTIONS from '../../actions'
import { dispatcher } from '../../../../utils/functions/dispatcher'
import HttpService from '../../../../utils/http'
import firebase from '../../../../utils/firebase'

export const newProject = (payload, callback) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.NEW_PROJECT_REQ))
	return HttpService.postRequest({ url: '/projects/newproject', body: payload })
		.then((res) => {
			callback()
			return dispatch(dispatcher(ACTIONS.NEW_PROJECT_SUCCESS, res))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to add project'
			return dispatch(dispatcher(ACTIONS.NEW_PROJECT_FAILURE, errMsg))
		})
}

export const loadSelectedProject = (projectId) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.LOAD_SELECTED_PROJECT_REQ))
	const unSubscribe = firebase
		.firestore()
		.doc(`PROJECTS/${projectId}`)
		.onSnapshot(
			(doc) => {
				if (!doc.exists) throw new Error('no-doc')
				return dispatch(
					dispatcher(ACTIONS.LOAD_SELECTED_PROJECT_SUCCESS, doc.data())
				)
			},
			(err) => {
				const errMsg = err.message || 'Failed to load project'
				return dispatch(
					dispatcher(ACTIONS.LOAD_SELECTED_PROJECT_FAILURE, errMsg)
				)
			}
		)
}

export const addMember =
	({ employees, projectId }) =>
	(dispatch) => {
		dispatch(dispatcher(ACTIONS.ADD_MEMBERS_REQ))
		return HttpService.postRequest({
			url: `/projects/${projectId}/addemployee`,
			body: { employees },
		})
			.then((res) => {
				return dispatch(dispatcher(ACTIONS.ADD_MEMBERS_SUCCESS, res))
			})
			.catch((err) => {
				const errMsg = err.message || 'Failed to add members'
				return dispatch(dispatcher(ACTIONS.ADD_MEMBERS_FAILURE, errMsg))
			})
	}

export const removeMember =
	({ employees, projectId }) =>
	(dispatch) => {
		dispatch(dispatcher(ACTIONS.REMOVE_MEMBER_REQ))
		return HttpService.putRequest({
			url: `/projects/${projectId}/removeemployee`,
			body: { employees },
		})
			.then((res) => {
				return dispatch(dispatcher(ACTIONS.REMOVE_MEMBER_SUCCESS, res))
			})
			.catch((err) => {
				const errMsg = err.message || 'Failed to add members'
				return dispatch(dispatcher(ACTIONS.REMOVE_MEMBER_FAILURE, errMsg))
			})
	}

export const updatePermissions = (payload, projectId) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.UPDATE_PERMISSIONS_REQ))
	return HttpService.putRequest({
		url: `/projects/${projectId}/updatepermissions`,
		body: payload,
	})
		.then((res) => {
			return dispatch(dispatcher(ACTIONS.UPDATE_PERMISSIONS_SUCCESS, res))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to add members'
			return dispatch(dispatcher(ACTIONS.UPDATE_PERMISSIONS_FAILURE, errMsg))
		})
}

export const loadProjectTimeLine = (projectID) => (dispatch) => {
	console.log('Project-Timeline')
	dispatch(dispatcher(ACTIONS.LOAD_PROJECT_TIMELINE_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection('PROJECTS')
		.doc(projectID)
		.collection('PROJECT_TIMELINE')
		.orderBy('createdAt', 'desc')
		.onSnapshot(
			(snap) => {
				const data = {}
				snap.docs.forEach((doc) => {
					data[doc.id] = doc.data()
				})
				return dispatch(dispatcher(ACTIONS.LOAD_PROJECT_TIMELINE_SUCCESS, data))
			},
			(err) => {
				console.error(err)
				const msg = 'Failed To Load  Project Timeline'
				errorMsg(msg)
				return dispatch(dispatcher(ACTIONS.LOAD_PROJECT_TIMELINE_FAILURE, msg))
			}
		)
}

export const updateProject = (payload, projectId) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.UPDATE_PROJECT_REQ))
	return HttpService.putRequest({
		url: `/projects/${projectId}/updateproject`,
		body: payload,
	})
		.then((res) => {
			return dispatch(dispatcher(ACTIONS.UPDATE_PROJECT_SUCCESS, res))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to update project'
			return dispatch(dispatcher(ACTIONS.UPDATE_PROJECT_FAILURE, errMsg))
		})
}
