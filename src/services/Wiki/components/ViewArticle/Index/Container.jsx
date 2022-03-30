import React, { useEffect } from 'react'
import {
	deleteArticle,
	restoreArticle,
	followOrUnfollow,
	voteForArticle,
	revertArticle,
	getArticle,
	getCategoriesMetaInfo,
	getHistoryById,
} from '../../../middleware'
import Presentation from './Presentation'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../../../../utils/components/loader'
import { useHistory } from 'react-router-dom'

export default function Container(props) {
	const { articleId, isHistory, historyId } = props

	const dispatch = useDispatch()
	const history = useHistory()

	const categoriesMeta = useSelector(
		(appState) => appState.wiki.categories.meta
	)

	useEffect(() => {
		if (Object.keys(categoriesMeta.data).length === 0) {
			dispatch(getCategoriesMetaInfo())
		}
	}, [])

	useEffect(() => {
		if (!isHistory) {
			dispatch(getArticle(articleId))
		} else {
			dispatch(getHistoryById(articleId, historyId))
		}
	}, [articleId, historyId, isHistory])

	const loadingCondition = () => {
		return categoriesMeta.loading
	}

	const callback = () => {
		history.push('/console/wiki')
	}

	const onDeleteArticle = () => {
		dispatch(deleteArticle(articleId, callback))
	}

	const onRestoreArticle = (categoryId) => {
		dispatch(restoreArticle(articleId, categoryId, callback))
	}

	const onRevertArticle = (payload, categoryId) => {
		dispatch(revertArticle(payload, articleId, categoryId, callback))
	}

	const onFollowOrUnfollow = (type) => {
		dispatch(followOrUnfollow(articleId, type))
	}

	const onVote = (type) => {
		dispatch(voteForArticle(articleId, type))
	}

	if (loadingCondition()) return <Loader />

	return (
		<Presentation
			categoryMetaInfo={categoriesMeta.data}
			isHistory={isHistory}
			articleId={articleId}
			onDeleteArticle={onDeleteArticle}
			onRestoreArticle={onRestoreArticle}
			onRevertArticle={onRevertArticle}
			onFollowOrUnfollow={onFollowOrUnfollow}
			onVote={onVote}
		/>
	)
}
