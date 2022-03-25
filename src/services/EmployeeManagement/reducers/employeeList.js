import ACTIONS from '../actions'

const initialState = {
	all: { loading: true, data: {}, error: null },
	active: { loading: true, data: {}, error: null },
	inActive: { loading: true, data: {}, error: null },
	suspended: { loading: true, data: {}, error: null },
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.LOAD_ALL_EMPLOYEES_REQ:
			return {
				...state,
				all: {
					...state.all,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.LOAD_ALL_EMPLOYEES_SUCCESS:
			return {
				...state,
				all: {
					...state.all,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.LOAD_ALL_EMPLOYEES_FAILURE:
			return {
				...state,
				all: {
					...state.all,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.LOAD_ACTIVE_EMPLOYEES_REQ:
			return {
				...state,
				active: {
					...state.active,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.LOAD_ACTIVE_EMPLOYEES_SUCCESS:
			return {
				...state,
				active: {
					...state.active,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.LOAD_ACTIVE_EMPLOYEES_FAILURE:
			return {
				...state,
				active: {
					...state.active,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.LOAD_INACTIVE_EMPLOYEES_REQ:
			return {
				...state,
				inActive: {
					...state.inActive,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.LOAD_INACTIVE_EMPLOYEES_SUCCESS:
			return {
				...state,
				inActive: {
					...state.inActive,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.LOAD_INACTIVE_EMPLOYEES_FAILURE:
			return {
				...state,
				inActive: {
					...state.inActive,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.LOAD_SUSPENDED_EMPLOYEES_REQ:
			return {
				...state,
				suspended: {
					...state.suspended,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.LOAD_SUSPENDED_EMPLOYEES_SUCCESS:
			return {
				...state,
				suspended: {
					...state.suspended,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.LOAD_SUSPENDED_EMPLOYEES_FAILURE:
			return {
				...state,
				suspended: {
					...state.suspended,
					loading: false,
					error: payload,
				},
			}

		default:
			return state
	}
}
