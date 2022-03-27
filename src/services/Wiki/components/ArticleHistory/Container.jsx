import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticleHistory, getCategoriesMetaInfo } from '../../middleware'
import Loader from '../../../../utils/components/loader'
import Presentation from './Presentation'

export default function Container(props) {
	const { articleId } = props

	console.log({ articleId })

	const dispatch = useDispatch()

	const [articleHistory, setArticleHistory] = useState([])

	const history = useSelector((appState) => appState.wiki.history.list)
	const categoriesMeta = useSelector(
		(appState) => appState.wiki.categories.meta
	)

	useEffect(() => {
		dispatch(getArticleHistory(articleId))
	}, [articleId])

	useEffect(() => {
		if (history.data[articleId]) {
			setArticleHistory(Object.values(history.data[articleId]))
		}
	}, [JSON.stringify(history.data)])

	useEffect(() => {
		if (Object.keys(categoriesMeta.data).length === 0) {
			dispatch(getCategoriesMetaInfo())
		}
	}, [])

	if (categoriesMeta.loading) return <Loader />

	return (
		<Presentation
			history={articleHistory}
			loading={history.loading}
			categoryMetaInfo={categoriesMeta.data.types}
		/>
	)
}
