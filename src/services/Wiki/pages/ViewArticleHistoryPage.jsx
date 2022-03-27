import React from 'react'
import ViewArticle from '../components/ViewArticle'

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
