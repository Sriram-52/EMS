import ACTIONS from '../actions'

const initialState = {
	signIn: { loading: true, data: {}, error: null },
	signUp: { loading: true, data: {}, error: null },
	signOut: { loading: true, data: {}, error: null },
	forgotPassword: { loading: true, data: {}, error: null },
	changePassword: { loading: true, data: {}, error: null },
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.SIGN_IN_REQ:
			return {
				...state,
				signIn: {
					...state.signIn,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.SIGN_IN_SUCCESS:
			return {
				...state,
				signIn: {
					...state.signIn,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.SIGN_IN_FAILURE:
			return {
				...state,
				signIn: {
					...state.signIn,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.SIGN_UP_REQ:
			return {
				...state,
				signUp: {
					...state.signUp,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.SIGN_UP_SUCCESS:
			return {
				...state,
				signUp: {
					...state.signUp,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.SIGN_UP_FAILURE:
			return {
				...state,
				signUp: {
					...state.signUp,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.SIGN_OUT_REQ:
			return {
				...state,
				signOut: {
					...state.signOut,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.SIGN_OUT_SUCCESS:
			return {
				...state,
				signOut: {
					...state.signOut,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.SIGN_OUT_FAILURE:
			return {
				...state,
				signOut: {
					...state.signOut,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.CHANGE_PASSWORD_REQ:
			return {
				...state,
				changePassword: {
					...state.changePassword,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.CHANGE_PASSWORD_SUCCESS:
			return {
				...state,
				changePassword: {
					...state.changePassword,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.CHANGE_PASSWORD_FAILURE:
			return {
				...state,
				changePassword: {
					...state.changePassword,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.FORGOT_PASSWORD_REQ:
			return {
				...state,
				forgotPassword: {
					...state.forgotPassword,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				forgotPassword: {
					...state.forgotPassword,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.FORGOT_PASSWORD_FAILURE:
			return {
				...state,
				forgotPassword: {
					...state.forgotPassword,
					loading: false,
					error: payload,
				},
			}

		default:
			return state
	}
}
