import ACTIONS from '../actions'

const initialState = {
	all: { loading: true, data: {}, error: null },
	open: { loading: true, data: {}, error: null },
	inProgress: { loading: true, data: {}, error: null },
	review: { loading: true, data: {}, error: null },
	overDue: { loading: true, data: {}, error: null },
	closed: { loading: true, data: {}, error: null },
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.LOAD_ALL_TASKS_REQ:
			return {
				...state,
				all: {
					...state.all,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.LOAD_ALL_TASKS_SUCCESS:
			return {
				...state,
				all: {
					...state.all,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.LOAD_ALL_TASKS_FAILURE:
			return {
				...state,
				all: {
					...state.all,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.LOAD_OPEN_TASKS_REQ:
			return {
				...state,
				open: {
					...state.open,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.LOAD_OPEN_TASKS_SUCCESS:
			return {
				...state,
				open: {
					...state.open,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.LOAD_OPEN_TASKS_FAILURE:
			return {
				...state,
				open: {
					...state.open,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.LOAD_INPROGRESS_TASKS_REQ:
			return {
				...state,
				inProgress: {
					...state.inProgress,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.LOAD_INPROGRESS_TASKS_SUCCESS:
			return {
				...state,
				inProgress: {
					...state.inProgress,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.LOAD_INPROGRESS_TASKS_FAILURE:
			return {
				...state,
				inProgress: {
					...state.inProgress,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.LOAD_REVIEW_TASKS_REQ:
			return {
				...state,
				review: {
					...state.review,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.LOAD_REVIEW_TASKS_SUCCESS:
			return {
				...state,
				review: {
					...state.review,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.LOAD_REVIEW_TASKS_FAILURE:
			return {
				...state,
				review: {
					...state.review,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.LOAD_OVERDUE_TASKS_REQ:
			return {
				...state,
				overDue: {
					...state.overDue,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.LOAD_OVERDUE_TASKS_SUCCESS:
			return {
				...state,
				overDue: {
					...state.overDue,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.LOAD_OVERDUE_TASKS_FAILURE:
			return {
				...state,
				overDue: {
					...state.overDue,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.LOAD_CLOSED_TASKS_REQ:
			return {
				...state,
				closed: {
					...state.closed,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.LOAD_CLOSED_TASKS_SUCCESS:
			return {
				...state,
				closed: {
					...state.closed,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.LOAD_CLOSED_TASKS_FAILURE:
			return {
				...state,
				closed: {
					...state.closed,
					loading: false,
					error: payload,
				},
			}

		default:
			return state
	}
}
