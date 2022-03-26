import ACTIONS from '../actions'

const initialState = {
	list: { loading: true, data: {}, error: null },
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.GET_ARTICLE_HISTORY_REQ:
			return {
				...state,
				list: {
					...state.list,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.GET_ARTICLE_HISTORY_SUCCESS:
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

		case ACTIONS.GET_ARTICLE_HISTORY_FAILURE:
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					error: payload,
				},
			}

		default:
			return state
	}
}
