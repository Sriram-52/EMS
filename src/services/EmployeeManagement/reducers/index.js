import { combineReducers } from 'redux'
import ACTIONS from '../actions'
import employeeListReducer from './employeeList'
import newEmployeeState from '../states/registartion'

const initialState = {
	modules: { loading: true, data: {}, error: null },
	iniviteEmployee: { loading: true, data: {}, error: null },
	newEmployeeState,
	validateToken: { loading: true, data: {}, error: null },
	registerEmployee: { loading: false, data: {}, error: null },
}

const employeeReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.EMPLOYEE_MODULES_REQ:
			return {
				...state,
				modules: {
					...state.modules,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.EMPLOYEE_MODULES_SUCCESS:
			return {
				...state,
				modules: {
					...state.modules,
					data: payload,
					loading: false,
				},
			}

		case ACTIONS.EMPLOYEE_MODULES_FAILURE:
			return {
				...state,
				modules: {
					...state.modules,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.INVITE_EMPLOYEE_REQ:
			return {
				...state,
				iniviteEmployee: {
					...state.iniviteEmployee,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.INVITE_EMPLOYEE_SUCCESS:
			return {
				...state,
				iniviteEmployee: {
					...state.iniviteEmployee,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.INVITE_EMPLOYEE_FAILURE:
			return {
				...state,
				iniviteEmployee: {
					...state.iniviteEmployee,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.SET_NEW_EMPLOYEE_DETAILS:
			return {
				...state,
				newEmployeeState: {
					...state.newEmployeeState,
					...payload,
				},
			}

		case ACTIONS.VALIDATE_TOKEN_REQ:
			return {
				...state,
				validateToken: {
					...state.validateToken,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.VALIDATE_TOKEN_SUCCESS:
			return {
				...state,
				validateToken: {
					...state.validateToken,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.VALIDATE_TOKEN_FAILURE:
			return {
				...state,
				validateToken: {
					...state.validateToken,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.REGISTER_EMPLOYEE_REQ:
			return {
				...state,
				registerEmployee: {
					...state.registerEmployee,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.REGISTER_EMPLOYEE_SUCCESS:
			return {
				...state,
				registerEmployee: {
					...state.registerEmployee,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.REGISTER_EMPLOYEE_FAILURE:
			return {
				...state,
				registerEmployee: {
					...state.registerEmployee,
					loading: false,
					error: payload,
				},
			}

		default:
			return state
	}
}

const rootReducer = combineReducers({
	default: employeeReducer,
	list: employeeListReducer,
})

export default rootReducer
