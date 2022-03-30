import React, { useEffect, useState } from 'react'
import { Grid, Card, CardContent, makeStyles } from '@material-ui/core'
import Comments from '../Comments'
import ArticleContent from '../ArticleContent'
import Attachments from '../Attachments'
import ArticleInfo from '../ArticleInfo'
import { useSelector } from 'react-redux'
import Loader from '../../../../../utils/components/loader'
import ActionButtons from '../ActionButtons'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))

export default function Presentation(props) {
	const {
		isHistory,
		categoryMetaInfo,
		articleId,
		onFollowOrUnfollow,
		onVote,
		onDeleteArticle,
		onRestoreArticle,
		onRevertArticle,
	} = props

	const classes = useStyles()

	const [data, setData] = useState({})

	const selectedArticle = useSelector(
		(appState) => appState.wiki.articles.selected
	)

	const selectedHistory = useSelector(
		(appState) => appState.wiki.history.selected
	)

	useEffect(() => {
		if (!isHistory) {
			setData(selectedArticle.data)
		}
	}, [isHistory, JSON.stringify(selectedArticle.data)])

	useEffect(() => {
		if (
			isHistory &&
			selectedHistory.data.eventDetails &&
			selectedHistory.data.eventDetails.after
		) {
			setData(selectedHistory.data.eventDetails.after)
		}
	}, [isHistory, JSON.stringify(selectedHistory.data)])

	if (Object.keys(data).length === 0) return <Loader />

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={10}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<ArticleContent
							data={data}
							onFollowOrUnfollow={onFollowOrUnfollow}
							articleId={articleId}
							isHistory={isHistory}
							onVote={onVote}
						/>
					</Grid>
					<Grid item xs={12}>
						<Attachments attachments={data.attachments || []} />
					</Grid>
					{!isHistory && data.isExist ? (
						<Grid item xs={12}>
							<Card className={classes.root}>
								<CardContent>
									<h2>Comments:</h2>
									<Comments articleId={articleId} />
								</CardContent>
							</Card>
						</Grid>
					) : null}
				</Grid>
			</Grid>
			<Grid item xs={12} sm={2}>
				<Grid container spacing={2}>
					<ArticleInfo data={data} categoryMetaInfo={categoryMetaInfo} />
				</Grid>
				<Grid container spacing={2}>
					<ActionButtons
						data={data}
						isHistory={isHistory}
						articleId={articleId}
						onDeleteArticle={onDeleteArticle}
						onRestoreArticle={onRestoreArticle}
						onRevertArticle={onRevertArticle}
					/>
				</Grid>
			</Grid>
		</Grid>
	)
}
