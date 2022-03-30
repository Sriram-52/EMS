import React from 'react'
import ViewArticle from '../components/ViewArticle/Index'

export default function ViewArticlePage(props) {
	const {
		match: {
			params: { articleId },
		},
	} = props
	return <ViewArticle articleId={articleId} isHistory={false} historyId='' />
}
