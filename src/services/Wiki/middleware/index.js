import HttpService from '../../../utils/http'
import { dispatcher } from '../../../utils/functions/dispatcher'
import ACTIONS from '../actions'
import firebase from '../../../utils/firebase'

export const voteForArticle = (articleId, type) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.VOTE_ARTICLE_REQ))
	return HttpService.putRequest({
		url: `/wiki/voteForWikiArticle/${articleId}/${type}`,
		body: {},
	})
		.then((res) => {
			return dispatch(dispatcher(ACTIONS.VOTE_ARTICLE_SUCCESS, res))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to vote'
			return dispatch(dispatcher(ACTIONS.VOTE_ARTICLE_FAILURE, errMsg))
		})
}

export const followOrUnfollow = (articleId, type) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.FOLLOW_ARTICLE_REQ))
	return HttpService.putRequest({
		url: `/wiki/followOrunFollowArticle/${articleId}/${type}`,
		body: {},
	})
		.then((res) => {
			return dispatch(dispatcher(ACTIONS.FOLLOW_ARTICLE_SUCCESS, res))
		})
		.catch((err) => {
			const errMsg = err.message || `Failed to ${type}`
			return dispatch(dispatcher(ACTIONS.FOLLOW_ARTICLE_FAILURE, errMsg))
		})
}

export const getComments = (articleId) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.GET_COMMENTS_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection(`WIKI/articles/ARTICLE_DOCS/${articleId}/ARTICLE_COMMENTS`)
		.where('isExist', '==', true)
		.onSnapshot(
			(querySnapshot) => {
				const comments = {}
				querySnapshot.docs.forEach((doc) => {
					comments[doc.id] = doc.data()
				})
				return dispatch(
					dispatcher(ACTIONS.GET_COMMENTS_SUCCESS, { [articleId]: comments })
				)
			},
			(err) => {
				const errMsg = err.message || 'Failed to get comments'
				return dispatch(dispatcher(ACTIONS.GET_COMMENTS_FAILURE, errMsg))
			}
		)
}

export const newComment = (payload, articleId, callback) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.NEW_COMMENT_REQ))
	return HttpService.postRequest({
		url: `/wiki/newcomment/${articleId}`,
		body: payload,
	})
		.then((res) => {
			callback()
			return dispatch(dispatcher(ACTIONS.NEW_COMMENT_SUCCESS, res))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to comment'
			return dispatch(dispatcher(ACTIONS.NEW_COMMENT_FAILURE, errMsg))
		})
}

export const updateComment =
	(payload, articleId, commentId, callback) => (dispatch) => {
		dispatch(dispatcher(ACTIONS.UPDATE_COMMENT_REQ))
		return HttpService.putRequest({
			url: `/wiki/updatecomment/${articleId}/${commentId}`,
			body: payload,
		})
			.then((res) => {
				callback()
				return dispatch(dispatcher(ACTIONS.UPDATE_COMMENT_SUCCESS, res))
			})
			.catch((err) => {
				const errMsg = err.message || 'Failed to update comment'
				return dispatch(dispatcher(ACTIONS.UPDATE_COMMENT_FAILURE, errMsg))
			})
	}

export const deleteComment = (articleId, commentId, callback) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.DELETE_COMMENT_REQ))
	return HttpService.deleteRequest({
		url: `/wiki/deletecomment/${articleId}/${commentId}`,
	})
		.then((res) => {
			callback()
			return dispatch(dispatcher(ACTIONS.DELETE_COMMENT_SUCCESS, res))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to delete comment'
			return dispatch(dispatcher(ACTIONS.DELETE_COMMENT_FAILURE, errMsg))
		})
}

export const restoreArticle =
	(articleId, categoryId, callback) => (dispatch) => {
		dispatch(dispatcher(ACTIONS.RESTORE_ARTICLE_REQ))
		return HttpService.putRequest({
			url: `/wiki/restorearticle/${articleId}/${categoryId}`,
			body: {},
		})
			.then((res) => {
				callback()
				return dispatch(dispatcher(ACTIONS.RESTORE_ARTICLE_SUCCESS, res))
			})
			.catch((err) => {
				const errMsg = err.message || 'Failed to restore article'
				return dispatch(dispatcher(ACTIONS.RESTORE_ARTICLE_FAILURE, errMsg))
			})
	}

export const revertArticle =
	(payload, articleId, categoryId, callback) => (dispatch) => {
		dispatch(dispatcher(ACTIONS.REVERT_ARTICLE_REQ))
		return HttpService.putRequest({
			url: `/wiki/updatearticle/${articleId}/${categoryId}`,
			body: payload,
		})
			.then((res) => {
				callback()
				return dispatch(dispatcher(ACTIONS.REVERT_ARTICLE_SUCCESS, res))
			})
			.catch((err) => {
				const errMsg = err.message || 'Failed to revert article'
				return dispatch(dispatcher(ACTIONS.REVERT_ARTICLE_FAILURE, errMsg))
			})
	}

export const deleteArticle = (articleId, callback) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.DELETE_ARTICLE_REQ))
	return HttpService.deleteRequest({
		url: `/wiki/deletearticle/${articleId}`,
	})
		.then((res) => {
			callback()
			return dispatch(dispatcher(ACTIONS.DELETE_ARTICLE_SUCCESS, res))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to delete article'
			return dispatch(dispatcher(ACTIONS.DELETE_ARTICLE_FAILURE, errMsg))
		})
}

export const updateArticle =
	(payload, articleId, categoryId, callback) => (dispatch) => {
		dispatch(dispatcher(ACTIONS.UPDATE_ARTICLE_REQ))
		return HttpService.putRequest({
			url: `/wiki/updatearticle/${articleId}/${categoryId}`,
			body: payload,
		})
			.then((res) => {
				return dispatch(dispatcher(ACTIONS.UPDATE_ARTICLE_SUCCESS, res))
			})
			.catch((err) => {
				const errMsg = err.message || 'Failed to update article'
				return dispatch(dispatcher(ACTIONS.UPDATE_ARTICLE_FAILURE, errMsg))
			})
	}

export const addNewArticle = (payload, categoryId, callback) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.CREATE_ARTICLE_REQ))
	return HttpService.postRequest({
		url: `/wiki/newarticle/${categoryId}`,
		body: payload,
	})
		.then((res) => {
			callback()
			return dispatch(dispatcher(ACTIONS.CREATE_ARTICLE_SUCCESS, res))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to add article'
			return dispatch(dispatcher(ACTIONS.CREATE_ARTICLE_FAILURE, errMsg))
		})
}

export const addNewCategory = (payload, resolve, reject) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.CREATE_CATEGORY_REQ))
	return HttpService.postRequest({
		url: `/wiki/newCategory`,
		body: payload,
	})
		.then((res) => {
			resolve()
			return dispatch(dispatcher(ACTIONS.CREATE_CATEGORY_SUCCESS, res))
		})
		.catch((err) => {
			reject()
			const errMsg = err.message || 'Failed to add category'
			return dispatch(dispatcher(ACTIONS.CREATE_CATEGORY_FAILURE, errMsg))
		})
}

export const updateCategory =
	(payload, categoryId, resolve, reject) => (dispatch) => {
		dispatch(dispatcher(ACTIONS.UPDATE_CATEGORY_REQ))
		return HttpService.putRequest({
			url: `/wiki/updateCategory/${categoryId}`,
			body: payload,
		})
			.then((res) => {
				resolve()
				return dispatch(dispatcher(ACTIONS.UPDATE_CATEGORY_SUCCESS, res))
			})
			.catch((err) => {
				reject()
				const errMsg = err.message || 'Failed to update category'
				return dispatch(dispatcher(ACTIONS.UPDATE_CATEGORY_FAILURE, errMsg))
			})
	}

export const deleteCategory = (categoryId, resolve, reject) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.DELETE_CATEGORY_REQ))
	return HttpService.deleteRequest({
		url: `/wiki/deleteCategory/${categoryId}`,
	})
		.then((res) => {
			resolve()
			return dispatch(dispatcher(ACTIONS.DELETE_CATEGORY_SUCCESS, res))
		})
		.catch((err) => {
			reject()
			const errMsg = err.message || 'Failed to delete category'
			return dispatch(dispatcher(ACTIONS.DELETE_CATEGORY_FAILURE, errMsg))
		})
}

export const getHistoryById = (articleId, historyId) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.GET_SELECTED_ARTICLE_HISTORY_REQ))
	return firebase
		.firestore()
		.doc(`WIKI/articles/ARTICLE_DOCS/${articleId}/ARTICLE_HISTORY/${historyId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) throw new Error('no-doc')
			return dispatch(
				dispatcher(ACTIONS.GET_SELECTED_ARTICLE_HISTORY_SUCCESS, doc.data())
			)
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to load history'
			return dispatch(
				dispatcher(ACTIONS.GET_SELECTED_ARTICLE_HISTORY_FAILURE, errMsg)
			)
		})
}

export const getArticleHistory = (articleId) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.GET_ARTICLE_HISTORY_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection(`WIKI/articles/ARTICLE_DOCS/${articleId}/ARTICLE_HISTORY`)
		.onSnapshot(
			(querySnapshot) => {
				const history = {}
				querySnapshot.docs.forEach((doc) => {
					history[doc.id] = doc.data()
				})
				return dispatch(
					dispatcher(ACTIONS.GET_ARTICLE_HISTORY_SUCCESS, {
						[articleId]: history,
					})
				)
			},
			(err) => {
				const errMsg = err.message || 'Failed to load history'
				return dispatch(dispatcher(ACTIONS.GET_ARTICLE_HISTORY_FAILURE, errMsg))
			}
		)
}

export const checkFirstUsage = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.CHECK_FIRST_USAGE_REQ))
	return firebase
		.firestore()
		.doc('WIKI/categories')
		.get()
		.then((docSnapshot) => {
			if (docSnapshot.exists) {
				return dispatch(dispatcher(ACTIONS.CHECK_FIRST_USAGE_SUCCESS, false))
			}
			const promises = []
			const promise1 = HttpService.postRequest({
				url: `/wiki/newCategory`,
				body: { name: 'General', description: 'Default category' },
			})
			promises.push(promise1)
			const promise2 = HttpService.postRequest({
				url: `/wiki/newCategory`,
				body: { name: 'Knowledge', description: 'Default category' },
			})
			promises.push(promise2)
			return Promise.all(promises)
		})
		.then(() => {
			return dispatch(dispatcher(ACTIONS.CHECK_FIRST_USAGE_SUCCESS, true))
		})
		.catch((err) => {
			console.error(err)
			const errMsg = err.message || 'Something went wrong'
			return dispatch(dispatcher(ACTIONS.CHECK_FIRST_USAGE_FAILURE, errMsg))
		})
}

export const getCategoriesMetaInfo = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.GET_CATEGORIES_META_REQ))
	const unSubscribe = firebase
		.firestore()
		.doc('WIKI/categories')
		.onSnapshot(
			(docSnapshot) => {
				return dispatch(
					dispatcher(ACTIONS.GET_CATEGORIES_META_SUCCESS, docSnapshot.data())
				)
			},
			(err) => {
				const errMsg = err.message || 'Failed to get data'
				return dispatch(dispatcher(ACTIONS.GET_CATEGORIES_META_FAILURE, errMsg))
			}
		)
}

export const getCategories = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.GET_CATEGORIES_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection('WIKI/categories/CATEGORY_DOCS')
		.where('isExist', '==', true)
		.onSnapshot(
			(querySnapshot) => {
				const categories = {}
				querySnapshot.docs.forEach((doc) => {
					categories[doc.id] = doc.data()
				})
				return dispatch(dispatcher(ACTIONS.GET_CATEGORIES_SUCCESS, categories))
			},
			(err) => {
				console.error(err)
				const errMsg = err.message || 'Failed to get categories'
				return dispatch(dispatcher(ACTIONS.GET_CATEGORIES_FAILURE, errMsg))
			}
		)
}

export const getArticles = (categoryId) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.GET_ARTICLES_REQ))
	return firebase
		.firestore()
		.collection('WIKI/articles/ARTICLE_DOCS')
		.where('categoryId', '==', categoryId)
		.where('isExist', '==', true)
		.orderBy('createdAt', 'desc')
		.get()
		.then((querySnapshot) => {
			const articles = {}
			querySnapshot.docs.forEach((doc) => {
				articles[doc.id] = doc.data()
			})
			return dispatch(
				dispatcher(ACTIONS.GET_ARTICLES_SUCCESS, { [categoryId]: articles })
			)
		})
		.catch((err) => {
			console.error(err)
			const errMsg = err.message || 'Failed to get categories'
			return dispatch(dispatcher(ACTIONS.GET_ARTICLES_FAILURE, errMsg))
		})
}

export const getArticle = (articleId) => (dispatch) => {
	dispatch(dispatcher(ACTIONS.GET_SELECTED_ARTICLE_REQ))
	return firebase
		.firestore()
		.doc(`WIKI/articles/ARTICLE_DOCS/${articleId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) throw new Error('no-doc')
			return dispatch(
				dispatcher(ACTIONS.GET_SELECTED_ARTICLE_SUCCESS, doc.data())
			)
		})
		.catch((err) => {
			console.error(err)
			if (err.toString().match('no-doc')) {
				return dispatch(
					dispatcher(
						ACTIONS.GET_SELECTED_ARTICLE_FAILURE,
						'No document found with given id'
					)
				)
			}
			const errMsg = err.message || 'Failed to get categories'
			return dispatch(dispatcher(ACTIONS.GET_SELECTED_ARTICLE_FAILURE, errMsg))
		})
}

export const getRecentlyAddedArticles = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.GET_RECENTLY_ARTICLES_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection('WIKI/articles/ARTICLE_DOCS')
		.where('isExist', '==', true)
		.orderBy('createdAt', 'desc')
		.limit(5)
		.onSnapshot(
			(querySnapshot) => {
				const articles = {}
				querySnapshot.docs.forEach((doc) => {
					articles[doc.id] = doc.data()
				})
				return dispatch(
					dispatcher(ACTIONS.GET_RECENTLY_ARTICLES_SUCCESS, articles)
				)
			},
			(err) => {
				console.error(err)
				const errMsg = err.message || 'Failed to get articles'
				return dispatch(
					dispatcher(ACTIONS.GET_RECENTLY_ARTICLES_FAILURE, errMsg)
				)
			}
		)
}

export const getArchivedArticles = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.GET_ARCHIVED_ARTICLES_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection('WIKI/articles/ARTICLE_DOCS')
		.where('isExist', '==', false)
		.orderBy('createdAt', 'desc')
		.onSnapshot(
			(querySnapshot) => {
				const articles = {}
				querySnapshot.docs.forEach((doc) => {
					articles[doc.id] = doc.data()
				})
				return dispatch(
					dispatcher(ACTIONS.GET_ARCHIVED_ARTICLES_SUCCESS, articles)
				)
			},
			(err) => {
				console.error(err)
				const errMsg = err.message || 'Failed to get articles'
				return dispatch(
					dispatcher(ACTIONS.GET_ARCHIVED_ARTICLES_FAILURE, errMsg)
				)
			}
		)
}
