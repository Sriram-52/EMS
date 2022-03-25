import ACTIONS from '../actions'
import { dispatcher } from '../../../utils/functions/dispatcher'
import HttpService from '../../../utils/http'

const BASE_URL = import.meta.env.VITE_APP_BASE_URL

export const getEmployeeModules = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.EMPLOYEE_MODULES_REQ))
	return HttpService.getRequest({ url: '/employee/modules' })
		.then((res) => {
			return dispatch(dispatcher(ACTIONS.EMPLOYEE_MODULES_SUCCESS, res))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to load modules'
			return dispatch(dispatcher(ACTIONS.EMPLOYEE_MODULES_FAILURE, errMsg))
		})
}

export const inviteEmployee = (payload, callback) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.INVITE_EMPLOYEE_REQ))
	return HttpService.postRequest({ url: '/auth/inviteemployee', body: payload })
		.then((res) => {
			callback()
			return dispatch(dispatcher(ACTIONS.INVITE_EMPLOYEE_SUCCESS, res.message))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to invite the employee'
			return dispatch(dispatcher(ACTIONS.INVITE_EMPLOYEE_FAILURE, errMsg))
		})
}

export const validateToken = (token) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.VALIDATE_TOKEN_REQ))
	return HttpService.postRequest({
		url: `${BASE_URL}/auth/validateinvitationtoken`,
		body: { token },
	})
		.then((res) => {
			return dispatch(
				dispatcher(ACTIONS.VALIDATE_TOKEN_SUCCESS, { email: res })
			)
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to verify the token'
			return dispatch(dispatcher(ACTIONS.VALIDATE_TOKEN_FAILURE, errMsg))
		})
}

export const registerEmployee = (token, callback) => (dispatch, getState) => {
	dispatch(dispatcher(ACTIONS.REGISTER_EMPLOYEE_REQ))

	const {
		personalDetails,
		mailingAddress,
		emergencyContact,
		employmentHistory,
		workAuth,
		password,
	} = getState().employee.default.newEmployeeState

	const payload = {
		token: token,
		password,
		employeeInfo: {
			personalDetails,
			mailingAddress,
			employmentHistory: [employmentHistory],
			emergencyContact: [emergencyContact],
			workAuth: [workAuth],
			imageURL: '',
		},
	}
	return HttpService.postRequest({
		url: `${BASE_URL}/auth/createemployee`,
		body: payload,
	})
		.then((res) => {
			callback()
			return dispatch(dispatcher(ACTIONS.REGISTER_EMPLOYEE_SUCCESS, res))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to register'
			return dispatch(dispatcher(ACTIONS.REGISTER_EMPLOYEE_FAILURE, errMsg))
		})
}

export const setNewEmployeeDetails =
	({ key, value, type }) =>
	(dispatch, getState) => {
		if (type) {
			const data = getState().employee.default.newEmployeeState[type]
			let updatedData = {
				...data,
				[key]: value,
			}
			return dispatch(
				dispatcher(ACTIONS.SET_NEW_EMPLOYEE_DETAILS, { [type]: updatedData })
			)
		} else {
			return dispatch(
				dispatcher(ACTIONS.SET_NEW_EMPLOYEE_DETAILS, { [key]: value })
			)
		}
	}
