import React from 'react'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import validate from '../../../../../utils/functions/validation'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import MetaInfo from '../../../../../utils/functions/metaInfo'
import { makeStyles } from '@material-ui/core/styles'

function formatSubject(item) {
	const metaInfo = new MetaInfo()
	switch (item.type) {
		case 'createProject':
			return (
				<span>
					{' '}
					<Link to={'/console/employees/' + item.actionBy}>
						{metaInfo.emailToName(item.actionBy)}
					</Link>{' '}
					created this project.{' '}
				</span>
			)

		case 'addMemberToProject':
			return (
				<span>
					<Link to={'/console/employees/' + item.actionBy}>
						{metaInfo.emailToName(item.actionBy)}
					</Link>{' '}
					added a member{' '}
					<Link to={'/console/employees/' + item.subject.uid}>
						{metaInfo.emailToName(item.subject.uid)}
					</Link>{' '}
					to this project.
				</span>
			)

		case 'deleteProjectMember':
			return (
				<span>
					<Link to={'/console/employees/' + item.actionBy}>
						{metaInfo.emailToName(item.actionBy)}
					</Link>{' '}
					removed a member{' '}
					<Link to={'/console/employees/' + item.subject.uid}>
						{metaInfo.emailToName(item.subject.uid)}
					</Link>{' '}
					from this project.
				</span>
			)

		case 'updateProjectAccessLevels':
			return (
				<span>
					<Link to={'/console/employees/' + item.actionBy}>
						{metaInfo.emailToName(item.actionBy)}
					</Link>{' '}
					updated the project access levels of{' '}
					<Link to={'/console/employees/' + item.subject.uid}>
						{metaInfo.emailToName(item.subject.uid)}
					</Link>
					.
				</span>
			)

		case 'updateProject':
			return (
				<span>
					<Link to={'/console/employees/' + item.actionBy}>
						{metaInfo.emailToName(item.actionBy)}
					</Link>{' '}
					updated the project details.
				</span>
			)
		case 'newLabel':
			return (
				<span>
					<Link to={'/console/employees/' + item.actionBy}>
						{metaInfo.emailToName(item.actionBy)}
					</Link>{' '}
					Created New Label
				</span>
			)
		case 'deleteLabel':
			return (
				<span>
					<Link to={'/console/employees/' + item.actionBy}>
						{metaInfo.emailToName(item.actionBy)}
					</Link>{' '}
					deleted New Label
				</span>
			)
		case 'updateLabel':
			return (
				<span>
					<Link to={'/console/employees/' + item.actionBy}>
						{metaInfo.emailToName(item.actionBy)}
					</Link>{' '}
					Updated New Label
				</span>
			)

		default:
			return <span>-----------------</span>
	}
}

function formatIcon(item) {
	//
	switch (item.type) {
		case 'createProject':
			return <AccountBalanceIcon fontSize='medium' />

		case 'addMemberToProject':
			return <PersonAddIcon fontSize='medium' />

		case 'deleteProjectMember':
			return <PersonAddDisabledIcon fontSize='medium' />

		case 'updateAccessLevels':
			return <VpnKeyIcon fontSize='medium' />

		case 'updateProject':
			return <AccountBalanceIcon fontSize='medium' />

		default:
			return <PauseCircleFilledIcon fontSize='medium' />
	}
}

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: '6px 16px',
	},
	secondaryTail: {
		backgroundColor: theme.palette.secondary.main,
	},
}))

function Presentation(props) {
	const { timelines } = props
	const classes = useStyles()

	return (
		<div>
			<Timeline align='alternate'>
				{Object.values(timelines.data).map((item) => {
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
								<Paper elevation={3} className={classes.paper}>
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
