import ACTIONS from '../actions'

const initialState = {
	list: { loading: true, data: {}, error: null },
	create: { loading: false, data: {}, error: null },
	update: { loading: false, data: {}, error: null },
	delete: { loading: false, data: {}, error: null },
	firstUsage: { loading: false, data: {}, error: null },
	meta: { loading: true, data: {}, error: null },
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.GET_CATEGORIES_REQ:
			return {
				...state,
				list: {
					...state.list,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.GET_CATEGORIES_SUCCESS:
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

		case ACTIONS.GET_CATEGORIES_FAILURE:
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.GET_CATEGORIES_META_REQ:
			return {
				...state,
				meta: {
					...state.meta,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.GET_CATEGORIES_META_SUCCESS:
			return {
				...state,
				meta: {
					...state.meta,
					data: payload,
					loading: false,
				},
			}

		case ACTIONS.GET_CATEGORIES_META_FAILURE:
			return {
				...state,
				meta: {
					...state.meta,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.CREATE_CATEGORY_REQ:
			return {
				...state,
				create: {
					...state.create,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.CREATE_CATEGORY_SUCCESS:
			return {
				...state,
				create: {
					...state.create,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.CREATE_CATEGORY_FAILURE:
			return {
				...state,
				create: {
					...state.create,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.UPDATE_CATEGORY_REQ:
			return {
				...state,
				update: {
					...state.update,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.UPDATE_CATEGORY_SUCCESS:
			return {
				...state,
				update: {
					...state.update,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.UPDATE_CATEGORY_FAILURE:
			return {
				...state,
				update: {
					...state.update,
					loading: false,
					error: payload,
				},
			}
		case ACTIONS.DELETE_CATEGORY_REQ:
			return {
				...state,
				delete: {
					...state.delete,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.DELETE_CATEGORY_SUCCESS:
			return {
				...state,
				delete: {
					...state.delete,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.DELETE_CATEGORY_FAILURE:
			return {
				...state,
				delete: {
					...state.delete,
					loading: false,
					error: payload,
				},
			}
		case ACTIONS.CHECK_FIRST_USAGE_REQ:
			return {
				...state,
				firstUsage: {
					...state.firstUsage,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.CHECK_FIRST_USAGE_SUCCESS:
			return {
				...state,
				firstUsage: {
					...state.firstUsage,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.CHECK_FIRST_USAGE_FAILURE:
			return {
				...state,
				firstUsage: {
					...state.firstUsage,
					loading: false,
					error: payload,
				},
			}
		default:
			return state
	}
}
