import React from 'react'
import {
	Typography,
	Grid,
	Divider,
	Tooltip,
	Paper,
	Avatar,
	Chip,
	IconButton,
	Card,
	CardContent,
	makeStyles,
	Button,
} from '@material-ui/core'
import MetaInfo from '../../../../utils/functions/metaInfo'
import { Link } from 'react-router-dom'
import validate from '../../../../utils/functions/validation'
import parser from 'html-react-parser'
import { HtmlTooltip } from '../../../../utils/components/toolTip'
import { blue } from '@material-ui/core/colors'
import { GoFileSymlinkFile } from 'react-icons/go'
import { Email } from '@material-ui/icons'
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'
import Comments from '../Comments'

const useStyles = makeStyles((theme) => ({
	grid: {
		padding: theme.spacing(2),
	},
	edit: {
		backgroundColor: '#1cacd7',
		marginBottom: theme.spacing(2),
	},
	history: {
		marginBottom: theme.spacing(2),
	},
	delete: {
		marginBottom: theme.spacing(2),
	},
	paper: {
		padding: theme.spacing(2),
	},
	customWidth: {
		maxWidth: 100,
	},
	root: {
		minWidth: 275,
		marginTop: theme.spacing(6),
	},
}))

function RenderButton(props) {
	const {
		data,
		isHistory,
		onDeleteArticle,
		articleId,
		onRestoreArticle,
		auth,
		access_modules,
		onRevertArticle,
	} = props

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

function Presentation(props) {
	const {
		data,
		isHistory,
		categoryMetaInfo,
		articleId,
		onFollowOrUnfollow,
		auth,
		onVote,
	} = props
	const classes = useStyles()
	const metaInfo = new MetaInfo()
	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={10}>
					<Paper className={classes.paper}>
						<div className='d-flex'>
							<div>
								<Tooltip title={metaInfo.emailToName(data.createdBy)}>
									<Avatar src={metaInfo.getImage(data.createdBy)} />
								</Tooltip>
							</div>
							<div className='ml-4'>
								<Typography variant='h6'>{data.title}</Typography>
								<div>
									<Typography variant='caption'>
										UpdatedBy:{' '}
										<Chip
											size='small'
											label={metaInfo.emailToName(data.updatedBy)}
										/>
									</Typography>
									<Typography variant='caption' className='ml-2'>
										UpdatedOn: {validate.dateAndTimeFormatter(data.updatedAt)}
									</Typography>
								</div>
							</div>
						</div>
						<div className={classes.grid}>
							{typeof data.content === 'string' ? (
								<Typography variant='body1'>{parser(data.content)}</Typography>
							) : null}
						</div>
						{!isHistory ? (
							<React.Fragment>
								<Divider />
								<div className='d-flex justify-content-between'>
									<div className='d-flex'>
										<HtmlTooltip
											title={
												<React.Fragment>
													<Typography className='text-center' color='inherit'>
														I like this
													</Typography>
												</React.Fragment>
											}
										>
											<IconButton onClick={() => onVote('upVotes')}>
												{data.upVotes.includes(auth.uid) ? (
													<FaRegThumbsUp style={{ color: blue[500] }} />
												) : (
													<FaRegThumbsUp />
												)}
											</IconButton>
										</HtmlTooltip>
										<HtmlTooltip
											title={
												<React.Fragment>
													<Typography className='text-center' color='inherit'>
														I dislike this
													</Typography>
												</React.Fragment>
											}
										>
											<IconButton onClick={() => onVote('downVotes')}>
												{data.downVotes.includes(auth.uid) ? (
													<FaRegThumbsDown style={{ color: blue[500] }} />
												) : (
													<FaRegThumbsDown />
												)}
											</IconButton>
										</HtmlTooltip>
									</div>
									<div className='mt-2'>
										<HtmlTooltip
											title={
												<React.Fragment>
													<Typography className='text-center' color='inherit'>
														When somebody makes an update here,you will get an
														email with details
													</Typography>
												</React.Fragment>
											}
										>
											{!data.following.includes(auth.uid) ? (
												<IconButton
													size='small'
													onClick={() =>
														onFollowOrUnfollow(articleId, 'follow')
													}
												>
													<Email />
													Follow
												</IconButton>
											) : (
												<IconButton
													size='small'
													onClick={() =>
														onFollowOrUnfollow(articleId, 'unfollow')
													}
												>
													<Email />
													Unfollow
												</IconButton>
											)}
										</HtmlTooltip>
									</div>
								</div>
							</React.Fragment>
						) : null}
					</Paper>
					<Grid item xs={12}>
						<Card className={classes.root}>
							<CardContent>
								<h2>Attachments:</h2>
								{data.hasOwnProperty('attachments')
									? data.attachments.map((doc, index) => (
											<Grid item xs={12} key={index}>
												<p>
													<a
														target='_blank'
														rel='noopener noreferrer'
														href={doc.url}
													>
														<GoFileSymlinkFile size={22} /> {doc.name}
													</a>
												</p>
											</Grid>
									  ))
									: null}
							</CardContent>
						</Card>
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
				<Grid item xs={12} sm={2}>
					<Grid container>
						<Grid item xs={12}>
							<Typography variant='h5' color='textSecondary'>
								Filed Under
							</Typography>
							<br />
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h5' style={{ textTransform: 'capitalize' }}>
								{categoryMetaInfo.types[data.categoryId]
									? categoryMetaInfo.types[data.categoryId]
									: categoryMetaInfo.archived[data.categoryId]}
							</Typography>
							<br />
						</Grid>
						<Grid item xs={12}>
							<Divider />
							<br />
						</Grid>
						<React.Fragment>
							<Grid item xs={12}>
								<Typography variant='h5' color='textSecondary'>
									Created On
								</Typography>
								<br />
							</Grid>
							<Grid item xs={12}>
								<Typography
									variant='h5'
									style={{ textTransform: 'capitalize' }}
								>
									{validate.dateFormatter(data.createdAt)}
								</Typography>
								<br />
							</Grid>
							<Grid item xs={12}>
								<Divider />
								<br />
							</Grid>
							<Grid item xs={12}>
								<Typography variant='h5' color='textSecondary'>
									Created By
								</Typography>
								<br />
							</Grid>
							<Grid item xs={12}>
								<Typography
									variant='h5'
									style={{ textTransform: 'capitalize' }}
								>
									{metaInfo.emailToName(data.createdBy)}
								</Typography>
								<br />
							</Grid>
							<Grid item xs={12}>
								<Divider />
								<br />
							</Grid>
						</React.Fragment>
						<RenderButton {...props} />
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default Presentation
