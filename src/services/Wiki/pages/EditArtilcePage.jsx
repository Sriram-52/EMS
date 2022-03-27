import React from 'react'
import NewArticle from '../components/NewArticle'

export default function EditArticlePage(props) {
	const {
		match: {
			params: { articleId },
		},
	} = props
	return <NewArticle isEdit={true} articleId={articleId} />
}
