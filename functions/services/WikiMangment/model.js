const { logToHistory } = require('../../providers/EventLogger')
const { admin, db } = require('../../utils/admin')
const WikiManagmentUTILS = require('./utils')

class WikiMangment {
	constructor(user) {
		this.actionPerformer = user
		this.articleRef = 'WIKI/articles/ARTICLE_DOCS'
		this.categoryRef = 'WIKI/categories/CATEGORY_DOCS'
	}

	async updateComment(commentId, articleId, inputs) {
		const articleRef = db.collection(`${this.articleRef}`).doc(articleId)
		const commentRef = articleRef.collection('ARTICLE_COMMENTS').doc(commentId)
		const historyRef = articleRef.collection('ARTICLE_HISTORY').doc()
		let commentInfo
		return WikiManagmentUTILS._check_article_exists(articleId)
			.then(() => {
				return WikiManagmentUTILS._check_comment_exists(commentId, articleId)
			})
			.then((data) => {
				commentInfo = data
				return commentRef.set(inputs, { merge: true })
			})
			.then(() => {
				const log = {
					id: historyRef.id,
					actionBy: this.actionPerformer.uid,
					createdAt: new Date().toISOString(),
					type: 'updatecommentInWikiPage',
					subject: {
						content: commentInfo.content,
						wikiArticleId: articleRef.id,
					},
					wikiArticleId: articleRef.id,
					eventDetails: {
						before: commentInfo,
						after: {
							...commentInfo,
							...inputs,
						},
					},
				}
				logToHistory(log)
				return
			})
			.catch((err) => {
				throw err
			})
	}

	async deleteComment(commentId, articleId) {
		const articleRef = db.collection(`${this.articleRef}`).doc(articleId)
		const commentRef = articleRef.collection('ARTICLE_COMMENTS').doc(commentId)
		const historyRef = articleRef.collection('ARTICLE_HISTORY').doc()
		let commentInfo
		return WikiManagmentUTILS._check_article_exists(articleId)
			.then(() => {
				return WikiManagmentUTILS._check_comment_exists(commentId, articleId)
			})
			.then((data) => {
				commentInfo = data
				return commentRef.set({ isExist: false }, { merge: true })
			})
			.then(() => {
				const log = {
					id: historyRef.id,
					actionBy: this.actionPerformer.uid,
					createdAt: new Date().toISOString(),
					type: 'deletecommentInWikiPage',
					subject: {
						content: commentInfo.content,
						wikiArticleId: articleRef.id,
					},
					wikiArticleId: articleRef.id,
					eventDetails: {
						before: commentInfo,
						after: {
							...commentInfo,
							isExist: false,
						},
					},
				}
				logToHistory(log)
				return
			})
			.catch((err) => {
				throw err
			})
	}

	async newcommentOnWikiArticle(articleId, inputs) {
		const articleRef = db.collection(`${this.articleRef}`).doc(articleId)
		const commentRef = articleRef.collection('ARTICLE_COMMENTS').doc()
		const historyRef = articleRef.collection('ARTICLE_HISTORY').doc()
		let articleInfo
		const fieldValue = admin.firestore.FieldValue
		return WikiManagmentUTILS._check_article_exists(articleId)
			.then((data) => {
				articleInfo = data
				return commentRef.set({
					...inputs,
					id: commentRef.id,
					articleId: articleId,
					isExist: true,
					createdAt: new Date().toISOString(),
					createdBy: this.actionPerformer.uid,
				})
			})
			.then(() => {
				const log = {
					id: historyRef.id,
					actionBy: this.actionPerformer.uid,
					createdAt: new Date().toISOString(),
					type: 'newcommentInWikiPage',
					subject: {
						content: inputs.content,
						wikiArticleId: articleRef.id,
					},
					wikiArticleId: articleRef.id,
					eventDetails: {
						before: {},
						after: {
							...inputs,
							articleId: articleId,
							isExist: true,
							createdAt: new Date().toISOString(),
							createdBy: this.actionPerformer.uid,
						},
					},
				}
				logToHistory(log)
				let following = articleInfo['following']
				if (!articleInfo.unfollowing.includes(this.actionPerformer.uid))
					return articleRef.set(
						{ following: fieldValue.arrayUnion(this.actionPerformer.uid) },
						{ merge: true }
					)

				return articleRef.set({ following: following }, { merge: true })
			})
			.catch((err) => {
				throw err
			})
	}

	async followOrunFollowArticle(articleId, followStatus) {
		const articleRef = db.collection(`${this.articleRef}`).doc(articleId)
		const fieldValue = admin.firestore.FieldValue
		let articleInfo
		return WikiManagmentUTILS._check_article_exists(articleId)
			.then((data) => {
				articleInfo = data
				if (!articleInfo.following.includes(this.actionPerformer.uid)) {
					return articleRef.set(
						{
							following: fieldValue.arrayUnion(this.actionPerformer.uid),
							unfollowing: fieldValue.arrayRemove(this.actionPerformer.uid),
						},
						{ merge: true }
					)
				} else {
					return articleRef.set(
						{
							following: fieldValue.arrayRemove(this.actionPerformer.uid),
							unfollowing: fieldValue.arrayUnion(this.actionPerformer.uid),
						},
						{ merge: true }
					)
				}
			})
			.then(() => {
				const log = {
					actionBy: this.actionPerformer.uid,
					createdAt: new Date().toISOString(),
					type:
						followStatus === 'follow'
							? 'followWikiArticle'
							: 'unFollowWikiArticle',
					subject: {
						title: articleInfo.title,
						wikiArticleId: articleRef.id,
					},
					wikiArticleId: articleRef.id,
					eventDetails: {
						before: articleInfo,
						after:
							followStatus === 'follow'
								? {
										...articleInfo,
										following: fieldValue.arrayUnion(this.actionPerformer.uid),
										unfollowing: fieldValue.arrayRemove(
											this.actionPerformer.uid
										),
								  }
								: {
										...articleInfo,
										following: fieldValue.arrayRemove(this.actionPerformer.uid),
										unfollowing: fieldValue.arrayUnion(
											this.actionPerformer.uid
										),
								  },
					},
				}
				logToHistory(log)
				return
			})
			.catch((err) => {
				throw err
			})
	}

	async upVoteOrdownVoteArticle(articleId, voteType) {
		const articleRef = db.collection(`${this.articleRef}`).doc(articleId)
		const fieldValue = admin.firestore.FieldValue
		let articleInfo
		const pairs = {
			upVotes: 'downVotes',
			downVotes: 'upVotes',
		}
		return WikiManagmentUTILS._check_article_exists(articleId)
			.then((data) => {
				articleInfo = data
				if (!articleInfo[voteType].includes(this.actionPerformer.uid)) {
					return articleRef.set(
						{
							[voteType]: fieldValue.arrayUnion(this.actionPerformer.uid),
							[pairs[voteType]]: fieldValue.arrayRemove(
								this.actionPerformer.uid
							),
						},
						{ merge: true }
					)
				} else {
					return articleRef.set(
						{
							[voteType]: fieldValue.arrayRemove(this.actionPerformer.uid),
							[pairs[voteType]]: articleInfo[pairs[voteType]],
						},
						{ merge: true }
					)
				}
			})
			.then(() => {
				const log = {
					actionBy: this.actionPerformer.uid,
					createdAt: new Date().toISOString(),
					type:
						voteType === 'upVotes'
							? 'voteForWikiArticle'
							: 'downVoteForWikiArticle',
					subject: {
						title: articleInfo.title,
						wikiArticleId: articleRef.id,
					},
					wikiArticleId: articleRef.id,
					eventDetails: {
						before: articleInfo,
						after:
							voteType === 'upVotes'
								? {
										...articleInfo,
										upVotes: fieldValue.arrayUnion(this.actionPerformer.uid),
								  }
								: {
										...articleInfo,
										downVotes: fieldValue.arrayUnion(this.actionPerformer.uid),
								  },
					},
				}
				logToHistory(log)
				return
			})
			.catch((err) => {
				throw err
			})
	}

	async restoreArticle(articleId, categoryId) {
		const articleRef = db.collection(`${this.articleRef}`).doc(articleId)
		const historyRef = articleRef.collection('ARTICLE_HISTORY').doc()
		const categoryRef = db.collection(this.categoryRef).doc(categoryId)
		const metaRef = db.collection('WIKI').doc('categories')
		let categoryInfo, articleInfo, metaInfo
		const fieldValue = admin.firestore.FieldValue
		return metaRef
			.get()
			.then((doc) => {
				if (!doc.exists) throw new Error('no-meta-info')
				metaInfo = doc.data()
				return categoryRef.get()
			})
			.then((doc) => {
				if (!doc.exists) throw new Error('no-category-exists')
				categoryInfo = doc.data()
				if (!categoryInfo.isExist)
					return categoryRef.set({ isExist: true }, { merge: true })
				return
			})
			.then(() => {
				if (!categoryInfo.isExist) {
					const types = { ...metaInfo.types, [categoryId]: categoryInfo.name }
					const archived = {}
					Object.entries(metaInfo.archived).forEach(([key, value]) => {
						if (key !== categoryId) archived[key] = value
					})
					return metaRef.set(
						{
							count: fieldValue.increment(1),
							types,
							archived,
						},
						{ merge: true }
					)
				}
				return
			})
			.then(() => {
				return WikiManagmentUTILS._check_article_doesnot_exist(articleId)
			})
			.then((data) => {
				articleInfo = data
				return articleRef.update({ isExist: true })
			})
			.then(() => {
				const log = {
					id: historyRef.id,
					actionBy: this.actionPerformer.uid,
					createdAt: new Date().toISOString(),
					type: 'restorePageInWiki',
					subject: {
						title: articleInfo.title,
						wikiArticleId: articleRef.id,
						categoryId: categoryId,
					},
					wikiArticleId: articleRef.id,
					eventDetails: {
						before: articleInfo,
						after: { ...articleInfo, isExist: true },
					},
				}
				logToHistory(log)
				return historyRef.set(log)
			})
			.catch((err) => {
				throw err
			})
	}

	async deleteArticle(articleId) {
		const articleRef = db.collection(`${this.articleRef}`).doc(articleId)
		const historyRef = articleRef.collection('ARTICLE_HISTORY').doc()
		let articleInfo
		return WikiManagmentUTILS._check_article_exists(articleId)
			.then((data) => {
				articleInfo = data
				return articleRef.update({ isExist: false })
			})
			.then(() => {
				const log = {
					id: historyRef.id,
					actionBy: this.actionPerformer.uid,
					createdAt: new Date().toISOString(),
					type: 'deletePageInWiki',
					subject: {
						title: articleInfo.title,
						wikiArticleId: articleRef.id,
					},
					wikiArticleId: articleRef.id,
					eventDetails: {
						before: articleInfo,
						after: { ...articleInfo, isExist: false },
					},
				}
				logToHistory(log)
				return historyRef.set(log)
			})
			.catch((err) => {
				throw err
			})
	}

	async newArticle(categoryId, inputs) {
		const articleRef = db.collection(`${this.articleRef}`).doc()
		const historyRef = articleRef.collection('ARTICLE_HISTORY').doc()
		return articleRef
			.set({
				...inputs,
				isExist: true,
				id: articleRef.id,
				categoryId,
				createdAt: new Date().toISOString(),
				createdBy: this.actionPerformer.uid,
				upVotes: [],
				downVotes: [],
				following: [this.actionPerformer.uid],
				unfollowing: [],
				updatedBy: this.actionPerformer.uid,
				updatedAt: new Date().toISOString(),
			})
			.then(() => {
				const log = {
					id: historyRef.id,
					actionBy: this.actionPerformer.uid,
					createdAt: new Date().toISOString(),
					type: 'newPageInWiki',
					subject: {
						title: inputs.title,
						wikiArticleId: articleRef.id,
					},
					wikiArticleId: articleRef.id,
					eventDetails: {
						before: {},
						after: {
							...inputs,
							isExist: true,
							id: articleRef.id,
							categoryId,
							createdAt: new Date().toISOString(),
							createdBy: this.actionPerformer.uid,
							upVotes: [],
							downVotes: [],
							following: [this.actionPerformer.uid],
							unfollowing: [],
							updatedBy: this.actionPerformer.uid,
							updatedAt: new Date().toISOString(),
						},
					},
				}
				logToHistory(log)
				return historyRef.set(log)
			})
			.catch((err) => {
				throw err
			})
	}

	async updateArticle(articleId, categoryId, inputs) {
		const articleRef = db.collection(`${this.articleRef}`).doc(articleId)
		const historyRef = articleRef.collection('ARTICLE_HISTORY').doc()
		let articleInfo
		return WikiManagmentUTILS._check_article_exists(articleId)
			.then((data) => {
				articleInfo = data
				return articleRef.set(
					{
						...inputs,
						categoryId,
						updatedBy: this.actionPerformer.uid,
						updatedAt: new Date().toISOString(),
					},
					{ merge: true }
				)
			})
			.then(() => {
				const log = {
					id: historyRef.id,
					actionBy: this.actionPerformer.uid,
					createdAt: new Date().toISOString(),
					type: 'updatePageInWiki',
					subject: {
						title: inputs.title,
						wikiArticleId: articleRef.id,
					},
					wikiArticleId: articleRef.id,
					eventDetails: {
						before: articleInfo,
						after: { ...articleInfo, ...inputs },
					},
				}
				logToHistory(log)
				return historyRef.set(log)
			})
			.catch((err) => {
				throw err
			})
	}

	async deleteCategory(categoryId) {
		const categoryRef = db.collection(this.categoryRef).doc(categoryId)

		const batch = db.batch()

		const metaRef = db.collection('WIKI').doc('categories')

		let categoryInfo, metaInfo

		return categoryRef
			.get()
			.then((data) => {
				categoryInfo = data.data()
				if (!categoryInfo.isExist) {
					throw new Error('category-already-deleted')
				}
				return categoryRef.update({ isExist: false })
			})
			.then(() => {
				const log = {
					actionBy: this.actionPerformer.uid,
					createdAt: new Date().toISOString(),
					type: 'deleteCategoryInWiki',
					subject: {
						categoryName: categoryInfo.name,
						id: categoryId,
					},
					eventDetails: {
						before: categoryInfo,
						after: { ...categoryInfo, isExist: false },
					},
				}
				logToHistory(log)
				return metaRef.get()
			})
			.then((doc) => {
				metaInfo = doc.data()
				const types = {}
				const archived = { ...metaInfo.archived }
				Object.entries(metaInfo.types).forEach(([key, value]) => {
					if (key !== categoryId) {
						types[key] = value
					} else {
						archived[key] = value
					}
				})
				return metaRef.set({
					count: Object.keys(types).length,
					types,
					archived,
				})
			})
			.then(() => {
				return db
					.collection(`${this.articleRef}`)
					.where('categoryId', '==', categoryId)
					.where('isExist', '==', true)
					.get()
			})
			.then((snap) => {
				return snap.docs.map((doc) => doc.id)
			})
			.then((data) => {
				data.forEach((id) => {
					const ref = db.collection(`${this.articleRef}`).doc(id)
					batch.update(ref, { isExist: false })
				})
				return batch.commit()
			})
			.catch((err) => {
				throw err
			})
	}

	async newCategory(inputs) {
		const categoryRef = db.collection(this.categoryRef).doc()

		const metaRef = db.collection('WIKI').doc('categories')
		let metaInfo

		return WikiManagmentUTILS._check_valid_category(inputs.name)
			.then((flag) => {
				if (!flag) throw new Error('category-already-exists')
				return categoryRef.set({
					...inputs,
					isExist: true,
					createdAt: new Date().toISOString(),
					createdBy: this.actionPerformer.uid,
					id: categoryRef.id,
				})
			})

			.then(() => {
				const log = {
					actionBy: this.actionPerformer.uid,
					createdAt: new Date().toISOString(),
					subject: {
						categoryName: inputs.name,
						id: categoryRef.id,
					},
					type: 'newCategoryInWiki',
					eventDetails: {
						before: {},
						after: {
							...inputs,
							isExist: true,
							createdAt: new Date().toISOString(),
							createdBy: this.actionPerformer.uid,
							id: categoryRef.id,
						},
					},
				}
				logToHistory(log)
				return metaRef.get()
			})
			.then((doc) => {
				metaInfo = doc.data()
				const types = {}
				doc.exists &&
					Object.entries(metaInfo.types).forEach(([key, value]) => {
						types[key] = value
					})
				types[categoryRef.id] = inputs.name
				const fieldValue = admin.firestore.FieldValue
				return metaRef.set(
					{
						count: fieldValue.increment(1),
						types,
					},
					{ merge: true }
				)
			})
			.catch((err) => {
				throw err
			})
	}

	async updateCategory(categoryId, inputs) {
		const categoryRef = db.collection(this.categoryRef).doc(categoryId)

		const metaRef = db.collection('WIKI').doc('categories')
		let metaInfo
		let categoryInfo

		return categoryRef
			.get()
			.then((data) => {
				categoryInfo = data.data()
				if (
					categoryInfo.name.trim().toLowerCase() !==
					inputs.name.trim().toLowerCase()
				) {
					return WikiManagmentUTILS._check_valid_category(inputs.name)
				}
				return true
			})
			.then((flag) => {
				if (!flag) throw new Error('category-already-exists')
				return categoryRef.update(inputs)
			})
			.then(() => {
				const log = {
					actionBy: this.actionPerformer.uid,
					createdAt: new Date().toISOString(),
					type: 'updateCategoryInWiki',
					subject: {
						categoryName: inputs.name,
						id: categoryId,
					},
					eventDetails: {
						before: categoryInfo,
						after: { ...categoryInfo, ...inputs },
					},
				}
				logToHistory(log)
				return metaRef.get()
			})
			.then((doc) => {
				metaInfo = doc.data()
				const types = {}
				Object.entries(metaInfo.types).forEach(([key, value]) => {
					if (key !== categoryId) {
						types[key] = value
					}
				})
				types[categoryRef.id] = inputs.name
				return metaRef.set(
					{
						types,
					},
					{ merge: true }
				)
			})
			.catch((err) => {
				throw err
			})
	}
}

module.exports = WikiMangment
