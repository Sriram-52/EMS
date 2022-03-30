import ACTIONS from '../actions'
import HttpService from '../../../utils/http'
import { dispatcher } from '../../../utils/functions/dispatcher'
import firebase from '../../../utils/firebase'

const setCompanyDetails = (payload) => (dispatch) => {
	return dispatch(dispatcher(ACTIONS.SET_COMPANY_DETAILS, payload))
}

export function uploadCompanyDetails(name, value) {
	return (dispatch, getState) => {
		const initState = getState().console.companyDetails
		if (!name.includes('-')) {
			const data = {
				...initState,
				[name]: value,
			}
			dispatch(setCompanyDetails(data))
		} else {
			const words = name.split('-')
			const word1 = words[0]
			const word2 = words[1]
			const data = {
				...initState,
				[word1]: {
					...initState[word1],
					[word2]: value,
				},
			}
			dispatch(setCompanyDetails(data))
		}
	}
}

export function submitCompanyDetails(payload) {
	return (dispatch, getState) => {
		dispatch(dispatcher(ACTIONS.UPDATE_MODULES_REQ))
		return HttpService.putRequest({
			url: '/console/companydetails/edit',
			body: payload,
		})
			.then((res) => {
				return dispatch(dispatcher(ACTIONS.UPDATE_MODULES_SUCCESS, res))
			})
			.catch((err) => {
				const errMsg = err.message || 'Failed to submit'
				return dispatch(dispatcher(ACTIONS.UPDATE_MODULES_FAILURE, errMsg))
			})
	}
}

export const loadCompanyDetails = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.LOAD_COMPANY_DETAILS_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection('COMPANY_CONFIG')
		.doc('details')
		.onSnapshot(
			(doc) => {
				return dispatch(
					dispatcher(ACTIONS.LOAD_COMPANY_DETAILS_SUCCESS, doc.data() || {})
				)
			},
			(err) => {
				const errMsg = err.message || 'Failed to load'
				return dispatch(
					dispatcher(ACTIONS.LOAD_COMPANY_DETAILS_FAILURE, errMsg)
				)
			}
		)
}

export const loadAllModules = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.LOAD_ALL_MODULES_REQ))
	return HttpService.getRequest({
		url: `/console/modulelevelaccess/allModules`,
	})
		.then((res) => {
			return dispatch(
				dispatcher(ACTIONS.LOAD_ALL_MODULES_SUCCESS, res.modulesData)
			)
		})
		.catch((err) => {
			return dispatch(dispatcher(ACTIONS.LOAD_ALL_MODULES_FAILURE, err))
		})
}

export const updateModules = (uid, payload) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.UPDATE_MODULES_REQ))
	return HttpService.putRequest({
		url: `/console/modulelevelaccess/${uid}/updateModules`,
		body: payload,
	})
		.then((res) => {
			return dispatch(dispatcher(ACTIONS.UPDATE_MODULES_SUCCESS, res.message))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to update modules'
			return dispatch(dispatcher(ACTIONS.UPDATE_MODULES_FAILURE, errMsg))
		})
}
