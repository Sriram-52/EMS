import React, { useEffect } from 'react'
import Presentation from './Presentation'
import {
	addNewCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from '../../middleware'
import { useDispatch, useSelector } from 'react-redux'

function Container() {
	const dispatch = useDispatch()

	const { loading, data, error } = useSelector(
		(appState) => appState.wiki.categories.list
	)

	useEffect(() => {
		dispatch(getCategories())
	}, [])

	const onRowAdd = (payload, resolve, reject) => {
		dispatch(addNewCategory(payload, resolve, reject))
	}

	const onRowUpdate = (payload, categoryId, resolve, reject) => {
		dispatch(updateCategory(payload, categoryId, resolve, reject))
	}

	const onRowDelete = (categoryId, resolve, reject) => {
		dispatch(deleteCategory(categoryId, resolve, reject))
	}

	return (
		<div>
			<Presentation
				loading={loading || error}
				categories={Object.values(data)}
				onRowAdd={onRowAdd}
				onRowDelete={onRowDelete}
				onRowUpdate={onRowUpdate}
			/>
		</div>
	)
}

export default Container
