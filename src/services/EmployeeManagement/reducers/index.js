import ACTIONS from '../actions'

const initialState = {
	modules: { loading: true, data: {}, error: null },
}

export default (state = initialState, { type, payload }) => {
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

		default:
			return state
	}
}
