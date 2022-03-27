import React, { useEffect, useState } from 'react'
import {
	deleteArticle,
	restoreArticle,
	followOrUnfollow,
	voteForArticle,
	revertArticle,
	getArticle,
	getCategoriesMetaInfo,
	getHistoryById,
} from '../../middleware'
import Presentation from './Presentation'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../../../utils/components/loader'
import { useHistory } from 'react-router-dom'

export default function Container(props) {
	const { articleId, isHistory, historyId } = props

	const [data, setData] = useState({})

	const dispatch = useDispatch()
	const history = useHistory()

	const categoriesMeta = useSelector(
		(appState) => appState.wiki.categories.meta
	)

	const selectedArticle = useSelector(
		(appState) => appState.wiki.articles.selected
	)

	const selectedHistory = useSelector(
		(appState) => appState.wiki.history.selected
	)

	const modules = useSelector((appState) => appState.employee.default.modules)

	const user = useSelector((appState) => appState.auth.signIn.data.user)

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

	useEffect(() => {
		if (!isHistory) {
			setData(selectedArticle.data)
		}
	}, [JSON.stringify(selectedArticle.data)])

	useEffect(() => {
		if (isHistory) {
			setData(selectedHistory.data.eventDetails.after)
		}
	}, [JSON.stringify(selectedHistory.data)])

	const loadingCondition = () => {
		if (!isHistory) {
			if (
				categoriesMeta.loading ||
				selectedArticle.loading ||
				selectedArticle.error ||
				Object.keys(data).length === 0
			) {
				return true
			}
		} else {
			if (
				categoriesMeta.loading ||
				selectedHistory.loading ||
				selectedHistory.error ||
				Object.keys(data).length === 0
			) {
				return true
			}
		}
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
			data={data}
			categoryMetaInfo={categoriesMeta.data}
			isHistory={isHistory}
			articleId={articleId}
			onDeleteArticle={onDeleteArticle}
			onRestoreArticle={onRestoreArticle}
			onRevertArticle={onRevertArticle}
			onFollowOrUnfollow={onFollowOrUnfollow}
			onVote={onVote}
			access_modules={modules.data}
			auth={user}
		/>
	)
}
