import React from 'react'
import { Paper, Tabs, Tab, AppBar, makeStyles } from '@material-ui/core'
import TaskList from '../Table'
import TabPanel from '../../../../../utils/components/tabPanel'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		display: 'flex',
		justifyContent: 'space-between',
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	btn: {
		backgroundColor: '#17a2b8',
		color: 'white',
		margin: '4px',
	},
	flex: {
		display: 'flex',
	},
	projectsarea: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}))

export default function Presentation(props) {
	const classes = useStyles()

	const { handleTabChange, tabValue, projectId } = props

	return (
		<div className={classes.projectsarea}>
			<AppBar position='static' color='default'>
				<Paper square>
					<Tabs
						value={tabValue}
						indicatorColor='primary'
						textColor='primary'
						onChange={handleTabChange}
						aria-label='disabled tabs example'
					>
						<Tab label='All' />
						<Tab label='Open' />
						<Tab label='InProgress' />
						<Tab label='OverDue' />
						<Tab label='Review' />
						<Tab label='Closed' />
					</Tabs>
				</Paper>
			</AppBar>
			<TabPanel value={tabValue} index={0}>
				<TaskList condition={0} projectId={projectId} />
			</TabPanel>
			<TabPanel value={tabValue} index={1}>
				<TaskList condition={1} projectId={projectId} />
			</TabPanel>
			<TabPanel value={tabValue} index={2}>
				<TaskList condition={2} projectId={projectId} />
			</TabPanel>
			<TabPanel value={tabValue} index={3}>
				<TaskList condition={3} projectId={projectId} />
			</TabPanel>
			<TabPanel value={tabValue} index={4}>
				<TaskList condition={4} projectId={projectId} />
			</TabPanel>
			<TabPanel value={tabValue} index={5}>
				<TaskList condition={5} projectId={projectId} />
			</TabPanel>
		</div>
	)
}
