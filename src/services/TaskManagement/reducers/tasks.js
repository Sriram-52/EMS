import ACTIONS from '../actions'

const initialState = {
	createTask: { loading: false, data: {}, error: null },
	updateTask: { loading: false, data: {}, error: null },
	timeline: { loading: true, data: {}, error: null },
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

		case ACTIONS.LOAD_TASK_TIMELINE_REQ:
			return {
				...state,
				timeline: {
					...state.timeline,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.LOAD_TASK_TIMELINE_SUCCESS:
			return {
				...state,
				timeline: {
					...state.timeline,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.LOAD_TASK_TIMELINE_FAILURE:
			return {
				...state,
				timeline: {
					...state.timeline,
					loading: false,
					error: payload,
				},
			}

		default:
			return state
	}
}
