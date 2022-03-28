import ACTIONS from '../actions'

const initialState = {
	newProject: { loading: false, data: {}, error: null },
	selectedProject: { loading: true, data: {}, error: null },
	addMember: { loading: false, data: {}, error: null },
	updatePermission: { loading: false, data: {}, error: null },
	removeMember: { loading: false, data: {}, error: null },
	timeline: { loading: true, data: {}, error: null },
	addLabels: { loading: false, data: {}, error: null },
	updateLabels: { loading: false, data: {}, error: null },
	deleteLabels: { loading: false, data: {}, error: null },
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.NEW_PROJECT_REQ:
			return {
				...state,
				newProject: {
					...state.newProject,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.NEW_PROJECT_SUCCESS:
			return {
				...state,
				newProject: {
					...state.newProject,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.NEW_PROJECT_FAILURE:
			return {
				...state,
				newProject: {
					...state.newProject,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.CREATE_LABELS_REQ:
			return {
				...state,
				addLabels: {
					...state.addLabels,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.CREATE_LABELS_SUCCESS:
			return {
				...state,
				addLabels: {
					...state.addLabels,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.CREATE_LABELS_FAILURE:
			return {
				...state,
				addLabels: {
					...state.addLabels,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.UPDATE_LABELS_REQ:
			return {
				...state,
				updateLabels: {
					...state.updateLabels,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.UPDATE_LABELS_SUCCESS:
			return {
				...state,
				updateLabels: {
					...state.updateLabels,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.UPDATE_LABELS_FAILURE:
			return {
				...state,
				updateLabels: {
					...state.updateLabels,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.DELETE_LABELS_REQ:
			return {
				...state,
				deleteLabels: {
					...state.deleteLabels,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.DELETE_LABELS_SUCCESS:
			return {
				...state,
				deleteLabels: {
					...state.deleteLabels,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.DELETE_LABELS_FAILURE:
			return {
				...state,
				deleteLabels: {
					...state.deleteLabels,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.ADD_MEMBERS_REQ:
			return {
				...state,
				addMember: {
					...state.addMember,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.ADD_MEMBERS_SUCCESS:
			return {
				...state,
				addMember: {
					...state.addMember,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.ADD_MEMBERS_FAILURE:
			return {
				...state,
				addMember: {
					...state.addMember,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.REMOVE_MEMBER_REQ:
			return {
				...state,
				removeMember: {
					...state.removeMember,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.REMOVE_MEMBER_SUCCESS:
			return {
				...state,
				removeMember: {
					...state.removeMember,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.REMOVE_MEMBER_FAILURE:
			return {
				...state,
				removeMember: {
					...state.removeMember,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.UPDATE_PERMISSIONS_REQ:
			return {
				...state,
				updatePermission: {
					...state.updatePermission,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.UPDATE_PERMISSIONS_SUCCESS:
			return {
				...state,
				updatePermission: {
					...state.updatePermission,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.UPDATE_PERMISSIONS_FAILURE:
			return {
				...state,
				updatePermission: {
					...state.updatePermission,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.LOAD_SELECTED_PROJECT_REQ:
			return {
				...state,
				selectedProject: {
					...state.selectedProject,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.LOAD_SELECTED_PROJECT_SUCCESS:
			return {
				...state,
				selectedProject: {
					...state.selectedProject,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.LOAD_SELECTED_PROJECT_FAILURE:
			return {
				...state,
				selectedProject: {
					...state.selectedProject,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.LOAD_PROJECT_TIMELINE_REQ:
			return {
				...state,
				timeline: {
					...state.timeline,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.LOAD_PROJECT_TIMELINE_SUCCESS:
			return {
				...state,
				timeline: {
					...state.timeline,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.LOAD_PROJECT_TIMELINE_FAILURE:
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
