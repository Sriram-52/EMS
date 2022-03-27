import ACTIONS from '../actions'

const initialState = {
	list: { loading: true, data: {}, error: null },
	recent: { loading: true, data: {}, error: null },
	archived: { loading: true, data: {}, error: null },
	create: { loading: false, data: {}, error: null },
	update: { loading: false, data: {}, error: null },
	delete: { loading: false, data: {}, error: null },
	follow: { loading: false, data: {}, error: null },
	vote: { loading: false, data: {}, error: null },
	restore: { loading: false, data: {}, error: null },
	revert: { loading: false, data: {}, error: null },
	selected: { loading: true, data: {}, error: null },
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTIONS.GET_ARTICLES_REQ:
			return {
				...state,
				list: {
					...state.list,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.GET_ARTICLES_SUCCESS:
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

		case ACTIONS.GET_ARTICLES_FAILURE:
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.GET_SELECTED_ARTICLE_REQ:
			return {
				...state,
				selected: {
					...state.selected,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.GET_SELECTED_ARTICLE_SUCCESS:
			return {
				...state,
				selected: {
					...state.selected,
					data: payload,
					loading: false,
				},
			}

		case ACTIONS.GET_SELECTED_ARTICLE_FAILURE:
			return {
				...state,
				selected: {
					...state.selected,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.GET_RECENTLY_ARTICLES_REQ:
			return {
				...state,
				recent: {
					...state.recent,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.GET_RECENTLY_ARTICLES_SUCCESS:
			return {
				...state,
				recent: {
					...state.recent,
					data: payload,
					loading: false,
				},
			}

		case ACTIONS.GET_RECENTLY_ARTICLES_FAILURE:
			return {
				...state,
				recent: {
					...state.recent,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.GET_ARCHIVED_ARTICLES_REQ:
			return {
				...state,
				archived: {
					...state.archived,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.GET_ARCHIVED_ARTICLES_SUCCESS:
			return {
				...state,
				archived: {
					...state.archived,
					data: payload,
					loading: false,
				},
			}

		case ACTIONS.GET_ARCHIVED_ARTICLES_FAILURE:
			return {
				...state,
				archived: {
					...state.archived,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.CREATE_ARTICLE_REQ:
			return {
				...state,
				create: {
					...state.create,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.CREATE_ARTICLE_SUCCESS:
			return {
				...state,
				create: {
					...state.create,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.CREATE_ARTICLE_FAILURE:
			return {
				...state,
				create: {
					...state.create,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.UPDATE_ARTICLE_REQ:
			return {
				...state,
				update: {
					...state.update,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.UPDATE_ARTICLE_SUCCESS:
			return {
				...state,
				update: {
					...state.update,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.UPDATE_ARTICLE_FAILURE:
			return {
				...state,
				update: {
					...state.update,
					loading: false,
					error: payload,
				},
			}
		case ACTIONS.DELETE_ARTICLE_REQ:
			return {
				...state,
				delete: {
					...state.delete,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.DELETE_ARTICLE_SUCCESS:
			return {
				...state,
				delete: {
					...state.delete,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.DELETE_ARTICLE_FAILURE:
			return {
				...state,
				delete: {
					...state.delete,
					loading: false,
					error: payload,
				},
			}
		case ACTIONS.FOLLOW_ARTICLE_REQ:
			return {
				...state,
				follow: {
					...state.follow,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.FOLLOW_ARTICLE_SUCCESS:
			return {
				...state,
				follow: {
					...state.follow,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.FOLLOW_ARTICLE_FAILURE:
			return {
				...state,
				follow: {
					...state.follow,
					loading: false,
					error: payload,
				},
			}
		case ACTIONS.VOTE_ARTICLE_REQ:
			return {
				...state,
				vote: {
					...state.vote,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.VOTE_ARTICLE_SUCCESS:
			return {
				...state,
				vote: {
					...state.vote,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.VOTE_ARTICLE_FAILURE:
			return {
				...state,
				vote: {
					...state.vote,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.RESTORE_ARTICLE_REQ:
			return {
				...state,
				restore: {
					...state.restore,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.RESTORE_ARTICLE_SUCCESS:
			return {
				...state,
				restore: {
					...state.restore,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.RESTORE_ARTICLE_FAILURE:
			return {
				...state,
				restore: {
					...state.restore,
					loading: false,
					error: payload,
				},
			}

		case ACTIONS.REVERT_ARTICLE_REQ:
			return {
				...state,
				revert: {
					...state.revert,
					loading: true,
					error: null,
				},
			}

		case ACTIONS.REVERT_ARTICLE_SUCCESS:
			return {
				...state,
				revert: {
					...state.revert,
					loading: false,
					data: payload,
				},
			}

		case ACTIONS.REVERT_ARTICLE_FAILURE:
			return {
				...state,
				revert: {
					...state.revert,
					loading: false,
					error: payload,
				},
			}

		default:
			return state
	}
}
