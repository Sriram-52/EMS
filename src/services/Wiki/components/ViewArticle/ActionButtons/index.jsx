import React from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ActionButtons(props) {
	const {
		data,
		isHistory,
		onDeleteArticle,
		articleId,
		onRestoreArticle,
		onRevertArticle,
	} = props

	const access_modules = useSelector(
		(appState) => appState.employee.default.modules.data
	)
	const auth = useSelector((appState) => appState.auth.signIn.data.user)

	if (!isHistory && !data.isExist) {
		return (
			<Grid item xs={12}>
				<Button
					variant='contained'
					onClick={() => onRestoreArticle(data.categoryId)}
					color='secondary'
					fullWidth
				>
					Restore Article
				</Button>
			</Grid>
		)
	}

	if (isHistory) {
		return (
			<Grid item xs={12}>
				<Button
					onClick={() =>
						onRevertArticle(
							{
								title: data.title,
								content: data.content,
								attachments: data.attachments,
							},
							articleId,
							data.categoryId
						)
					}
					color='secondary'
					variant='contained'
					fullWidth
				>
					Revert Changes
				</Button>
			</Grid>
		)
	}

	if (
		access_modules.includes('wiki-manager') ||
		access_modules.includes('console-customization') ||
		auth.uid === data.createdBy
	) {
		return (
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Link
						to={'/console/wiki/' + data.id + '/edit'}
						style={{ color: 'white' }}
					>
						<Button fullWidth variant='contained' color='inherit'>
							<Typography color='error'>Edit Article</Typography>
						</Button>
					</Link>
				</Grid>
				<Grid item xs={12}>
					<Link
						to={'/console/wiki/' + data.id + '/history'}
						style={{ color: 'white' }}
					>
						<Button fullWidth variant='contained' color='primary'>
							View History
						</Button>
					</Link>
				</Grid>
				<Grid item xs={12}>
					<Button
						variant='contained'
						onClick={onDeleteArticle}
						color='secondary'
						fullWidth
					>
						Delete Article
					</Button>
				</Grid>
			</Grid>
		)
	}

	return <React.Fragment></React.Fragment>
}
