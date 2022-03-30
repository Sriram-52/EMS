import React from 'react'
import ViewArticle from '../components/ViewArticle/Index'

export default function ViewArticleHistoryPage(props) {
	const {
		match: {
			params: { articleId, historyId },
		},
	} = props
	return (
		<ViewArticle articleId={articleId} historyId={historyId} isHistory={true} />
	)
}
