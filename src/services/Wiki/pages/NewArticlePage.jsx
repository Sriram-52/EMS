import React from 'react'
import NewArticle from '../components/NewArticle'

export default function NewArticlePage(props) {
	const {
		match: {
			params: { search },
		},
	} = props
	return <NewArticle search={search} isEdit={false} articleId='' />
}
