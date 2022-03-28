import React from 'react'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import ExpansionPanel from '@material-ui/core/Accordion'
import ExpansionPanelDetails from '@material-ui/core/AccordionDetails'
import ExpansionPanelSummary from '@material-ui/core/AccordionSummary'
import ExpansionPanelActions from '@material-ui/core/AccordionActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'
import ActiveMembers from '../../../ActiveMembers'
import ProjectMembers from '../../ProjectMembers'
import ProjectTimeline from '../../Timeline'
import Labels from '../../Labels'
import ProjectDetails from '../../ProjectDetails'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	layout: {
		width: 800,
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
	},
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: 'bold',
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
}))

export default function Presentation(props) {
	const {
		projectId,
		handleProjectMembers,
		isCountExceeded,
		projectMembers,
		onAddMembers,
		project,
	} = props

	const classes = useStyles()
	const [expanded, setExpanded] = React.useState(false)

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}

	return (
		<div className={clsx(classes.root)}>
			<main className={clsx(classes.layout)}>
				<ExpansionPanel
					expanded={expanded === 'panel1'}
					onChange={handleChange('panel1')}
				>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1bh-content'
						id='tm-settings-general-settings'
					>
						<Typography className={classes.heading}>
							General settings
						</Typography>
						<Typography className={classes.secondaryHeading}></Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div style={{ minWidth: '100%' }}>
							<ActiveMembers
								onChange={handleProjectMembers}
								defaultEmp={Object.values(project.Users).map(({ uid }) => uid)}
								name='name'
							/>
						</div>
					</ExpansionPanelDetails>
					<Divider />
					<ExpansionPanelActions>
						<Button
							onClick={onAddMembers}
							disabled={isCountExceeded}
							variant='contained'
						>
							Add selected
						</Button>
					</ExpansionPanelActions>
				</ExpansionPanel>
				<ExpansionPanel
					expanded={expanded === 'panel2'}
					onChange={handleChange('panel2')}
				>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel2bh-content'
						id='tm-settings-members-permissions'
					>
						<Typography className={classes.heading}>
							Members & Permissions
						</Typography>
						<Typography className={classes.secondaryHeading}>
							Manage Permissions/Members added to this Project.
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<ProjectMembers
							assignees={Object.values(project.Users)}
							projectId={projectId}
						/>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel
					expanded={expanded === 'panel3'}
					onChange={handleChange('panel3')}
				>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel3bh-content'
						id='tm-settings-project-settings'
					>
						<Typography className={classes.heading}>Project Details</Typography>
						<Typography className={classes.secondaryHeading}>
							Manage Project Settings
						</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<ProjectDetails projectId={projectId} />
					</ExpansionPanelDetails>
				</ExpansionPanel>
				{project.useTimeline && (
					<ExpansionPanel
						expanded={expanded === 'panel4'}
						onChange={handleChange('panel4')}
					>
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls='panel4bh-content'
							id='tm-settings-project-timelines'
						>
							<Typography className={classes.heading}>
								Project Timeline
							</Typography>
							<Typography className={classes.secondaryHeading}></Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<ProjectTimeline projectId={projectId} />
						</ExpansionPanelDetails>
					</ExpansionPanel>
				)}
				{project.useLabels && (
					<ExpansionPanel
						expanded={expanded === 'panel5'}
						onChange={handleChange('panel5')}
					>
						<ExpansionPanelSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls='panel4bh-content'
							id='tm-settings-labels'
						>
							<Typography className={classes.heading}>Labels</Typography>
							<Typography className={classes.secondaryHeading}></Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<div style={{ width: '100%' }}>
								<Labels projectId={projectId} />
							</div>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				)}
			</main>
		</div>
	)
}
