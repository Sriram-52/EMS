import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	checkFirstUsage,
	getArchivedArticles,
	getArticles,
	getCategoriesMetaInfo,
	getRecentlyAddedArticles,
} from '../../middleware'
import Loader from '../../../../utils/components/loader'
import Presentation from './Presentation'
import { getKeyByValue } from '../../../../utils/functions/customJs'

export default function Container() {
	const dispatch = useDispatch()

	const [generalId, setGeneralId] = useState('')
	const [knowledgeId, setKnowledgeId] = useState('')
	const [searchKeyWord, setSearchKeyWord] = useState('new')

	const [allArticles, setAllArticles] = useState([])

	const firstUsage = useSelector(
		(appState) => appState.wiki.categories.firstUsage
	)
	const categories = useSelector((appState) => appState.wiki.categories.meta)
	const { list, recent, archived } = useSelector(
		(appState) => appState.wiki.articles
	)
	const { modules } = useSelector((appState) => appState.employee.default)

	useEffect(() => {
		dispatch(checkFirstUsage())
		dispatch(getCategoriesMetaInfo())
		dispatch(getRecentlyAddedArticles())
		dispatch(getArchivedArticles())
	}, [])

	useEffect(() => {
		const data = categories.data
		if (Object.keys(data).length > 0) {
			const _generalId = getKeyByValue(data.types, 'General')
			const _knowledgeId = getKeyByValue(data.types, 'Knowledge')
			setGeneralId(_generalId)
			setKnowledgeId(_knowledgeId)
			Object.keys(data.types).forEach((key) => dispatch(getArticles(key)))
		}
	}, [JSON.stringify(categories.data)])

	useEffect(() => {
		let _articles = []
		Object.entries(list.data).forEach(([categoryId]) => {
			_articles = [..._articles, ...Object.values(list.data[categoryId])]
		})
		setAllArticles(_articles)
	}, [JSON.stringify(list.data)])

	const loadingCondition = () => {
		if (Object.keys(categories.data).length === 0 || firstUsage.loading) {
			return true
		}

		if (list.loading || recent.loading || archived.loading) {
			return true
		}

		if (!generalId || !knowledgeId) {
			return true
		}

		return false
	}

	if (loadingCondition()) {
		return <Loader />
	}

	console.log({ allArticles })

	return (
		<Presentation
			general={Object.values(list.data[generalId] || {})}
			knowledge={Object.values(list.data[knowledgeId] || {})}
			archived={Object.values(archived.data || {})}
			recentlyAdded={Object.values(recent.data || {})}
			access_modules={modules.data}
			searchKeyWord={searchKeyWord}
			setSearchKeyWord={setSearchKeyWord}
			allArticles={allArticles}
		/>
	)
}
