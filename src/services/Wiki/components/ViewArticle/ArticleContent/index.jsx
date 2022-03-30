import React from 'react'
import {
	Typography,
	Divider,
	Tooltip,
	Paper,
	Avatar,
	Chip,
	IconButton,
	makeStyles,
} from '@material-ui/core'
import MetaInfo from '../../../../../utils/functions/metaInfo'
import { HtmlTooltip } from '../../../../../utils/components/toolTip'
import { Email as EmailIcon } from '@material-ui/icons'
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'
import { blue } from '@material-ui/core/colors'
import { useSelector } from 'react-redux'
import HTMLReactParser from 'html-react-parser'
import validate from '../../../../../utils/functions/validation'

function VoteIcons(props) {
	const { condition, Icon } = props
	if (condition) {
		return <Icon style={{ color: blue[500] }} />
	}
	return <Icon />
}

function FollowIcon(props) {
	const { data, auth, onFollowOrUnfollow, articleId } = props
	if (data.following.includes(auth.uid)) {
		return (
			<IconButton
				size='small'
				onClick={() => onFollowOrUnfollow(articleId, 'unfollow')}
			>
				<EmailIcon />
				Unfollow
			</IconButton>
		)
	}
	return (
		<IconButton
			size='small'
			onClick={() => onFollowOrUnfollow(articleId, 'follow')}
		>
			<EmailIcon />
			Follow
		</IconButton>
	)
}

function ActionButtons(props) {
	const { data, articleId, auth, onFollowOrUnfollow, onVote } = props
	return (
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
							<VoteIcons
								Icon={FaRegThumbsUp}
								condition={data.upVotes.includes(auth.uid)}
							/>
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
							<VoteIcons
								Icon={FaRegThumbsDown}
								condition={data.downVotes.includes(auth.uid)}
							/>
						</IconButton>
					</HtmlTooltip>
				</div>
				<div className='mt-2'>
					<HtmlTooltip
						title={
							<React.Fragment>
								<Typography className='text-center' color='inherit'>
									When somebody makes an update here,you will get an email with
									details
								</Typography>
							</React.Fragment>
						}
					>
						<FollowIcon
							data={data}
							auth={auth}
							onFollowOrUnfollow={onFollowOrUnfollow}
							articleId={articleId}
						/>
					</HtmlTooltip>
				</div>
			</div>
		</React.Fragment>
	)
}

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))

export default function ArticleContent(props) {
	const { data, isHistory, articleId, onFollowOrUnfollow, onVote } = props
	const classes = useStyles()
	const auth = useSelector((appState) => appState.auth.signIn.data.user)
	const metaInfo = new MetaInfo()

	return (
		<Paper className={classes.root}>
			<div className='d-flex'>
				<Tooltip title={metaInfo.emailToName(data.createdBy)}>
					<Avatar src={metaInfo.getImage(data.createdBy)} />
				</Tooltip>
				<div className='ml-4'>
					<Typography variant='h6'>{data.title}</Typography>
					<div>
						<Typography variant='caption'>
							UpdatedBy:{' '}
							<Chip size='small' label={metaInfo.emailToName(data.updatedBy)} />
						</Typography>
						<Typography variant='caption' className='ml-2'>
							UpdatedOn: {validate.dateAndTimeFormatter(data.updatedAt)}
						</Typography>
					</div>
				</div>
			</div>
			<div className='p-2'>
				<Typography variant='body1'>
					{HTMLReactParser(data.content || '')}
				</Typography>
			</div>
			{!isHistory && data.isExist ? (
				<ActionButtons
					data={data}
					auth={auth}
					onFollowOrUnfollow={onFollowOrUnfollow}
					articleId={articleId}
					onVote={onVote}
				/>
			) : null}
		</Paper>
	)
}
