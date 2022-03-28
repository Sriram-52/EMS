import ACTIONS from '../actions'

const initialState = {
	createTask: { loading: false, data: {}, error: null },
	updateTask: { loading: false, data: {}, error: null },
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.NEW_TASK_REQ:
			return {
				...state,
				createTask: {
					...state.createTask,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.NEW_TASK_SUCCESS:
			return {
				...state,
				createTask: {
					...state.createTask,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.NEW_TASK_FAILURE:
			return {
				...state,
				createTask: {
					...state.createTask,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.EDIT_TASK_REQ:
			return {
				...state,
				updateTask: {
					...state.updateTask,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.EDIT_TASK_SUCCESS:
			return {
				...state,
				updateTask: {
					...state.updateTask,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.EDIT_TASK_FAILURE:
			return {
				...state,
				updateTask: {
					...state.updateTask,
					loading: false,
					error: payload,
				},
			}

		default:
			return state
	}
}
