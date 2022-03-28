import React from 'react'
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck'
import PlaylistAdd from '@material-ui/icons/PlaylistAdd'
import AddComment from '@material-ui/icons/AddComment'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'
import SpeakerNotesOff from '@material-ui/icons/SpeakerNotesOff'
import SystemUpdateAlt from '@material-ui/icons/SystemUpdateAlt'
import validate from '../../../../../utils/functions/validation'
import { Link } from 'react-router-dom'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import MetaInfo from '../../../../../utils/functions/metaInfo'

function formatSubject(item) {
	const metaInfo = new MetaInfo()
	switch (item.type) {
		case 'createTask':
			return (
				<span>
					{' '}
					<Link to={'/console/employees/' + item.actionBy}>
						{metaInfo.emailToName(item.actionBy)}
					</Link>{' '}
					created this task.{' '}
				</span>
			)

		case 'updateTask':
			return (
				<span>
					<Link to={'/console/employees/' + item.actionBy}>
						{metaInfo.emailToName(item.actionBy)}
					</Link>{' '}
					updated this task.
				</span>
			)

		case 'newCommentOnTask':
			return (
				<span>
					<Link to={'/console/employees/' + item.actionBy}>
						{metaInfo.emailToName(item.actionBy)}
					</Link>{' '}
					added comment.
				</span>
			)

		case 'updateComment':
			return (
				<span>
					<Link to={'/console/employees/' + item.actionBy}>
						{metaInfo.emailToName(item.actionBy)}
					</Link>{' '}
					updated comment.
				</span>
			)

		case 'deleteCommentInTask':
			return (
				<span>
					<Link to={'/console/employees/' + item.actionBy}>
						{metaInfo.emailToName(item.actionBy)}
					</Link>{' '}
					deleted the comment.
				</span>
			)

		case 'createSubTask':
			return (
				<span>
					<Link to={'/console/employees/' + item.actionBy}>
						{metaInfo.emailToName(item.actionBy)}
					</Link>{' '}
					created the nested task.
				</span>
			)

		default:
			return <span>-----------------</span>
	}
}

// function formatTitle(item) {
//
//   switch (item.type) {
//     case "createTask":
//       return <span> {metaInfo.emailToName(item.actionBy)}</span>

//     case "updateTask":
//       return <span> {metaInfo.emailToName(item.actionBy)}</span>

//     case "newComment":
//       return <span> {metaInfo.emailToName(item.actionBy)}</span>

//     case "updateComment":
//       return <span>{metaInfo.emailToName(item.actionBy)}</span>

//     case "deleteComment":
//       return <span> {metaInfo.emailToName(item.actionBy)}</span>

//     case "createSubTask":
//       return <span> {metaInfo.emailToName(item.actionBy)}</span>

//     default:
//       return <span> {metaInfo.emailToName(item.actionBy)}</span>
//   }
// }
function formatIcon(item) {
	//
	switch (item.type) {
		case 'createTask':
			return <PlaylistAdd fontSize='medium' />

		case 'updateTask':
			return <PlaylistAddCheck fontSize='medium' />

		case 'newComment':
			return <AddComment fontSize='medium' />

		case 'updateComment':
			return <SystemUpdateAlt fontSize='medium' />

		case 'deleteComment':
			return <SpeakerNotesOff fontSize='medium' />

		default:
			return <PauseCircleFilledIcon fontSize='medium' />
	}
}

function Presentation(props) {
	const { taskTimeline } = props

	return (
		<div>
			<Timeline align='alternate'>
				{taskTimeline.map((item) => {
					return (
						<TimelineItem>
							<TimelineOppositeContent>
								<Typography variant='body2' color='textSecondary'>
									{validate.dateAndTimeFormatter(item.createdAt)}
								</Typography>
							</TimelineOppositeContent>
							<TimelineSeparator>
								<TimelineDot>{formatIcon(item)}</TimelineDot>
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent>
								<Paper elevation={3} style={{ padding: '6px 16px' }}>
									<Typography>{formatSubject(item)}</Typography>
								</Paper>
							</TimelineContent>
						</TimelineItem>
					)
				})}
			</Timeline>
		</div>
	)
}

export default Presentation
