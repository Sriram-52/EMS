import ACTIONS from '../actions'

const initialState = {
	allModules: { loading: true, data: {}, error: null },
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.LOAD_ALL_MODULES_REQ:
			return {
				...state,
				allModules: {
					...state.allModules,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.LOAD_ALL_MODULES_SUCCESS:
			return {
				...state,
				allModules: {
					...state.allModules,
					data: payload,
					loading: false,
				},
			}

		case ACTIONS.LOAD_ALL_MODULES_FAILURE:
			return {
				...state,
				allModules: {
					...state.allModules,
					error: payload,
					loading: false,
				},
			}

		default:
			return state
	}
}
