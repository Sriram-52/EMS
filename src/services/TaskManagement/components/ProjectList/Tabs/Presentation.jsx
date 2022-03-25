import React from 'react'
import { Paper, Tabs, Tab, AppBar, makeStyles } from '@material-ui/core'
import ProjectList from '../Table'
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

	const { handleTabChange, tabValue } = props

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
						<Tab label='InProgress' />
						<Tab label='OverDue' />
						<Tab label='Closed' />
					</Tabs>
				</Paper>
			</AppBar>
			<TabPanel value={tabValue} index={0}>
				<ProjectList condition={0} />
			</TabPanel>
			<TabPanel value={tabValue} index={1}>
				<ProjectList condition={1} />
			</TabPanel>
			<TabPanel value={tabValue} index={2}>
				<ProjectList condition={2} />
			</TabPanel>
			<TabPanel value={tabValue} index={3}>
				<ProjectList condition={3} />
			</TabPanel>
		</div>
	)
}
