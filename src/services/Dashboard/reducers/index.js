import ACTIONS from '../actions'

const initialState = {
	metaInfo: { loading: true, data: {}, error: null },
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.META_INFO_REQ:
			return {
				...state,
				metaInfo: {
					...state.metaInfo,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.META_INFO_SUCCESS:
			return {
				...state,
				metaInfo: {
					...state.metaInfo,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.META_INFO_FAILURE:
			return {
				...state,
				metaInfo: {
					...state.metaInfo,
					loading: false,
					error: payload,
				},
			}

		default:
			return state
	}
}
