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
	return HttpService.putRequest({
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
	return HttpService.putRequest({
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

export const getCategories = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.GET_CATEGORIES_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection('WIKI/categories/CATEGORY_DOCS')
		.onSnapshot(
			(querySnapshot) => {
				const categories = {}
				querySnapshot.docs.forEach((doc) => {
					categories[doc.id] = doc.data()
				})
				return dispatch(dispatcher(ACTIONS.GET_CATEGORIES_SUCCESS, categories))
			},
			(err) => {
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
			const errMsg = err.message || 'Failed to get categories'
			return dispatch(dispatcher(ACTIONS.GET_ARTICLES_FAILURE, errMsg))
		})
}
