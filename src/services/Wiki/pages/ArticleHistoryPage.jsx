import React from 'react'
import ArticleHistory from '../components/ArticleHistory'

export default function ArticleHistoryPage(props) {
	const {
		match: {
			params: { articleId },
		},
	} = props
	return <ArticleHistory articleId={articleId} />
}
