import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../../../utils/components/loader'
import { getCategoriesMetaInfo } from '../../../middleware'
import Presentation from './Presentation'

export default function Container() {
	const dispatch = useDispatch()
	const categoriesMeta = useSelector(
		(appState) => appState.wiki.categories.meta
	)

	const [categories, setCategories] = useState([])

	useEffect(() => {
		if (Object.keys(categoriesMeta.data).length === 0) {
			dispatch(getCategoriesMetaInfo())
		}
	}, [])

	useEffect(() => {
		if (categoriesMeta.data.types) {
			const _categories = []
			const predefinedCategoryNames = ['General', 'Knowledge', 'Archived']

			_categories[2] = {
				name: 'Archived',
				id: 'archived',
			}

			Object.entries(categoriesMeta.data.types || {}).forEach(
				([key, value]) => {
					if (predefinedCategoryNames.includes(value)) {
						_categories[predefinedCategoryNames.indexOf(value)] = {
							name: value,
							id: key,
						}
					} else {
						_categories.push({
							name: value,
							id: key,
						})
					}
				}
			)
			setCategories(_categories)
		}
	}, [JSON.stringify(categoriesMeta.data)])

	if (categoriesMeta.loading) return <Loader />

	console.log({ categories })

	return <Presentation categories={categories} />
}
