import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArchivedArticles, getArticles } from '../../../middleware'
import Presentation from './Presentation'

export default function Container(props) {
	const { categoryId } = props
	const dispatch = useDispatch()

	const { list, archived } = useSelector((appState) => appState.wiki.articles)
	const [articles, setArticles] = useState([])

	useEffect(() => {
		if (categoryId !== 'archived') {
			if (categoryId in list.data) {
				setArticles(Object.values(list.data[categoryId]))
			}
		}
	}, [categoryId, JSON.stringify(list.data)])

	useEffect(() => {
		if (categoryId === 'archived') {
			setArticles(Object.values(archived.data))
		}
	}, [categoryId, JSON.stringify(archived.data)])

	useEffect(() => {
		if (categoryId !== 'archived') {
			dispatch(getArticles(categoryId))
		} else {
			dispatch(getArchivedArticles())
		}
	}, [categoryId])

	if (categoryId === 'archived') {
		return <Presentation loading={archived.loading} articles={articles} />
	}

	return <Presentation loading={list.loading} articles={articles} />
}
