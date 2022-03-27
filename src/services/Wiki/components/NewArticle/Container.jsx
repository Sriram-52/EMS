import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Loader from '../../../../utils/components/loader'
import {
	getArticle,
	addNewArticle,
	updateArticle,
	getCategoriesMetaInfo,
} from '../../middleware'
import Presentation from './Presentation'
import { uploadToStorage } from '../../../../utils/functions/fileUploader'

export default function Container(props) {
	const { articleId, isEdit, search } = props
	const dispatch = useDispatch()

	const [state, setState] = useState({
		title: '',
		categoryId: '',
		content: '',
		attachments: [],
		categories: [],
	})

	const history = useHistory()

	const categoriesMeta = useSelector(
		(appState) => appState.wiki.categories.meta
	)

	const selectedArticle = useSelector(
		(appState) => appState.wiki.articles.selected
	)

	useEffect(() => {
		if (Object.keys(categoriesMeta.data).length === 0) {
			dispatch(getCategoriesMetaInfo())
		}
		if (search !== 'new')
			setState((prevState) => ({ ...prevState, title: search }))
	}, [])

	useEffect(() => {
		if (categoriesMeta.data.types) {
			const _categories = []
			Object.entries(categoriesMeta.data.types).forEach(([id, name]) =>
				_categories.push({ name, id })
			)
			setState((prevState) => ({ ...prevState, categories: _categories }))
		}
	}, [JSON.stringify(categoriesMeta.data)])

	useEffect(() => {
		if (isEdit) {
			dispatch(getArticle(articleId))
		}
	}, [isEdit])

	useEffect(() => {
		if (selectedArticle.data) {
			setState((prevState) => ({
				...prevState,
				...selectedArticle.data,
			}))
		}
	}, [JSON.stringify(selectedArticle.data)])

	const callback = () => {
		history.push('/console/wiki')
	}

	const handleChange = (event) => {
		const { name, value } = event.target
		setState((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleKeyValuePairs = (key, value) => {
		setState((prevState) => ({ ...prevState, [key]: value }))
	}

	const handleFile = (e) => {
		if (e.target.files[0]) {
			const file = e.target.files[0]
			setState((prevState) => ({ ...prevState, file }))
			console.log(file.name)
			fileUpload(file)
		}
	}

	const fileUpload = async (file) => {
		const fileName = file.name.split('.')[0]
		const filePath = `Wiki/Documents/${fileName}`
		setState((prevState) => ({ ...prevState, isUploading: true }))
		uploadToStorage(file, filePath, fileName, 'file')
			.then((url) => {
				console.log(url)
				setState((prevState) => ({
					...prevState,
					attachments: prevState.attachments.concat({ name: file.name, url }),
					isUploading: false,
				}))
			})
			.catch((err) => {
				console.error(err)
				setState((prevState) => ({ ...prevState, isUploading: false }))
			})
	}

	const handleDeleteAttachment = (index) => {
		const updatedAttachments = state.attachments.filter((_, i) => i !== index)
		setState((prevState) => ({ ...prevState, attachments: updatedAttachments }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (isEdit) {
			console.log('edit')
			dispatch(
				updateArticle(
					{
						title: state.title,
						content: state.content,
						attachments: state.attachments,
					},
					articleId,
					state.categoryId,
					callback
				)
			)
		} else {
			console.log('new')
			dispatch(
				addNewArticle(
					{
						title: state.title,
						content: state.content,
						attachments: state.attachments,
					},
					state.categoryId,
					callback
				)
			)
		}
	}

	const loadingCondition = () => {
		if (isEdit) {
			if (categoriesMeta.loading || selectedArticle.loading) {
				return true
			}
		} else {
			if (categoriesMeta.loading) {
				return true
			}
		}
	}

	if (loadingCondition()) return <Loader />

	return (
		<Presentation
			{...state}
			isEdit={isEdit}
			handleChange={handleChange}
			handleKeyValuePairs={handleKeyValuePairs}
			handleFile={handleFile}
			handleDeleteAttachment={handleDeleteAttachment}
			handleSubmit={handleSubmit}
			onClickCancel={callback}
		/>
	)
}
