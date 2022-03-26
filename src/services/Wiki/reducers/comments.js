import ACTIONS from '../actions'

const initialState = {
	list: { loading: true, data: {}, error: null },
	create: { loading: false, data: {}, error: null },
	update: { loading: false, data: {}, error: null },
	delete: { loading: false, data: {}, error: null },
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.GET_COMMENTS_REQ:
			return {
				...state,
				list: {
					...state.list,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.GET_COMMENTS_SUCCESS:
			return {
				...state,
				list: {
					...state.list,
					data: {
						...state.list.data,
						...payload,
					},
					loading: false,
				},
			}

		case ACTIONS.GET_COMMENTS_FAILURE:
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.NEW_COMMENT_REQ:
			return {
				...state,
				create: {
					...state.create,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.NEW_COMMENT_SUCCESS:
			return {
				...state,
				create: {
					...state.create,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.NEW_COMMENT_FAILURE:
			return {
				...state,
				create: {
					...state.create,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.UPDATE_COMMENT_REQ:
			return {
				...state,
				update: {
					...state.update,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.UPDATE_COMMENT_SUCCESS:
			return {
				...state,
				update: {
					...state.update,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.UPDATE_COMMENT_FAILURE:
			return {
				...state,
				update: {
					...state.update,
					loading: false,
					error: payload,
				},
			}
		case ACTIONS.DELETE_COMMENT_REQ:
			return {
				...state,
				delete: {
					...state.delete,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.DELETE_COMMENT_SUCCESS:
			return {
				...state,
				delete: {
					...state.delete,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.DELETE_COMMENT_FAILURE:
			return {
				...state,
				delete: {
					...state.delete,
					loading: false,
					error: payload,
				},
			}
		default:
			return state
	}
}
