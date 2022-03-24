import firebase from '../../../utils/firebase'
import { dispatcher } from '../../../utils/functions/dispatcher'
import ACTIONS from '../actions'
import axios from 'axios'
import HttpService from '../../../utils/http'

export const tokenListner = (dispatch) => {
	dispatch(dispatcher(ACTIONS.SIGN_IN_REQ))
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			user
				.getIdToken()
				.then((idToken) => {
					console.log(idToken)
					axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`
					axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL
					return dispatch(dispatcher(ACTIONS.SIGN_IN_SUCCESS, { user }))
				})
				.catch((err) => {
					console.error(err)
					const errMsg = err.message || 'Failed to login'
					return dispatch(dispatcher(ACTIONS.SIGN_IN_FAILURE, errMsg))
				})
		} else {
			const errMsg = 'No user to login'
			return dispatch(dispatcher(ACTIONS.SIGN_IN_FAILURE, errMsg))
		}
	})
}

export const signIn =
	({ email, password }) =>
	(dispatch) => {
		dispatch(dispatcher(ACTIONS.SIGN_IN_REQ))
		let user
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				user = userCredential.user
				return userCredential.user.getIdToken()
			})
			.then((idToken) => {
				console.log(idToken)
				axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`
				axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL
				return dispatch(dispatcher(ACTIONS.SIGN_IN_SUCCESS, { user }))
			})
			.catch((err) => {
				console.error(err)
				const errMsg = err.message || 'Failed to login'
				return dispatch(dispatcher(ACTIONS.SIGN_IN_FAILURE, errMsg))
			})
	}

export const signOut = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.SIGN_OUT_REQ))
	return firebase
		.auth()
		.signOut()
		.then(() => {
			return dispatch(dispatcher(ACTIONS.SIGN_OUT_SUCCESS))
		})
		.catch((err) => {
			console.error(err)
			const errMsg = err.message || 'Failed to signOut'
			return dispatch(dispatcher(ACTIONS.SIGN_IN_FAILURE, errMsg))
		})
}

export const forgotPassword = (email) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.FORGOT_PASSWORD_REQ))
	return HttpService.postRequest({
		url: `${
			import.meta.env.VITE_APP_BASE_URL
		}/auth/forgotpassword?email=${email}`,
		body: {},
	})
		.then((res) => {
			return dispatch(dispatcher(ACTIONS.FORGOT_PASSWORD_SUCCESS, res.message))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to send email'
			return dispatch(dispatcher(ACTIONS.FORGOT_PASSWORD_FAILURE, errMsg))
		})
}

export const changePassword = (password) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.CHANGE_PASSWORD_REQ))
	return HttpService.postRequest({
		url: `/auth/changepassword`,
		body: { password },
	})
		.then((res) => {
			return dispatch(dispatcher(ACTIONS.CHANGE_PASSWORD_SUCCESS, res.message))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to send email'
			return dispatch(dispatcher(ACTIONS.CHANGE_PASSWORD_FAILURE, errMsg))
		})
}
