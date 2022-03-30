import ACTION from '../actions'
import { initState } from '../state/companyDetailsState'

export function companyDetailsReducer(state = initState, action) {
	switch (action.type) {
		case ACTION.SET_COMPANY_DETAILS:
			return {
				...state,
				data: {
					...state.data,
					...action.payload,
				},
			}

		case ACTION.LOAD_COMPANY_DETAILS_REQ:
			return {
				...state,
				loading: true,
				error: null,
			}

		case ACTION.LOAD_COMPANY_DETAILS_SUCCESS:
			return {
				...state,
				data: {
					...state.data,
					...action.payload,
				},
				loading: false,
			}

		case ACTION.LOAD_COMPANY_DETAILS_FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false,
			}
		default:
			return state
	}
}
