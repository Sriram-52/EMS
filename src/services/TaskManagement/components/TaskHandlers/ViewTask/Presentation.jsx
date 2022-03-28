import React from 'react'
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	Chip,
	Grid,
	Card,
	CardContent,
	makeStyles,
	AppBar,
	Badge,
	Tab,
	Tabs,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import parser from 'html-react-parser'
import MetaInfo from '../../../../../utils/functions/metaInfo'
import validate from '../../../../../utils/functions/validation'
import TabPanel from '../../../../../utils/components/tabPanel'
import NewTask from '../NewTask'
import Labels from '../Labels'
import Comments from '../Comments'
import TaskTimeline from '../Timeline'

const useStyles = makeStyles({
	root: {
		//minWidth: 300,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	table: {
		backgroundColor: '#fafafa',
		overflowX: 'inherit',
		width: '100%',
	},
	card: {
		backgroundColor: '#fafafa',
		//minWidth: 300,
	},
})

const customStyles = {
	employeeExist: {
		color: '#4183c4',
		textTransform: 'capitalize',
	},
	employeeNonExist: {
		color: '#626466',
		textTransform: 'capitalize',
	},
}

export default function Presentation(props) {
	const classes = useStyles()
	const { project, task } = props
	let useLabels = project.useLabels
	let labels = project.labels

	const metaInfo = new MetaInfo()

	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<Grid container spacing={1}>
			<Grid item md={12} sm={12} xs={12}>
				<div className='d-flex justify-content-between'>
					<div>
						<h2>{task.title}</h2>
						<span>
							<Chip size='small' label={project.cid + ' - ' + task.cid} />{' '}
							&nbsp;
							{task.type === 'Task' ? (
								<Chip
									size='small'
									style={{ backgroundColor: '#17a2b8', color: 'white' }}
									label='Task'
								/>
							) : (
								<Chip
									size='small'
									style={{ backgroundColor: '#db2828', color: 'white' }}
									label='Bug'
								/>
							)}
						</span>
					</div>
					<div>
						<NewTask isEdit={true} taskId={task.id} projectId={project.id} />
					</div>
				</div>
				<hr />
			</Grid>
			<Grid item md={9} sm={9} xs={9}>
				<TableContainer className={classes.table} component={Paper}>
					<span className='d-flex'>
						<Table aria-label='simple table'>
							<TableBody>
								<TableRow>
									<TableCell width='20%'>
										<b>Start date:</b>
									</TableCell>
									<TableCell>
										{validate.dateFormatter(task.startdate)}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<b>End date:</b>
									</TableCell>
									<TableCell>{validate.dateFormatter(task.enddate)}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<b>Status:</b>
									</TableCell>
									<TableCell>{task.status}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<b>Priority:</b>
									</TableCell>
									<TableCell>{task.priority}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<b>Assignee:</b>
										<br />
									</TableCell>
									<TableCell>
										{task.assignee &&
											task.assignee.map((employee) => (
												<span>
													<Link to={'/console/employees/' + employee}>
														<Button
															type='a'
															style={
																Object.values(project.Users)
																	.map((user) => user.uid)
																	.includes(employee)
																	? customStyles.employeeExist
																	: customStyles.employeeNonExist
															}
															size='small'
														>
															{metaInfo.emailToName(employee)}
														</Button>
													</Link>
													<br />
												</span>
											))}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<b>Created By :</b>
									</TableCell>
									<TableCell>{metaInfo.emailToName(task.createdBy)}</TableCell>
								</TableRow>
								<TableRow></TableRow>
								<TableRow rowSpan={2}>
									<TableCell>
										<b>Description:</b>
									</TableCell>
									<TableCell>
										<div
											style={{
												wordWrap: 'break-word',
												width: 'fit-content',
											}}
										>
											{parser(task.description || '')}
										</div>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</span>
				</TableContainer>
			</Grid>
			<Grid item md={3} sm={3} xs={12}>
				<Card className={classes.card}>
					<CardContent>
						<h3>Project :</h3>
						<h3 style={{ fontWeight: '200' }}>{project.title} </h3>
					</CardContent>
				</Card>
				<Card className={classes.card}>
					<CardContent>
						<h3>Labels :</h3>
						<Labels projectId={project.id} taskId={task.id} />
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={12}>
				<AppBar position='static' color='default'>
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor='primary'
						textColor='primary'
						variant='scrollable'
						scrollButtons='auto'
						aria-label='scrollable auto tabs example'
					>
						<Tab label={<Badge color='primary' children='Comments' />} />
						<Tab label={<Badge color='primary' children='Timeline' />} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0}>
					<Grid item xs={12}>
						<Card className={classes.root}>
							<CardContent>
								<h2>Comments:</h2>
								<Comments taskId={task.id} projectId={project.id} />
							</CardContent>
						</Card>
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Grid item xs={12}>
						<Card className={classes.root}>
							<CardContent>
								<h2>Timeline:</h2>
								<TaskTimeline taskId={task.id} projectId={project.id} />
							</CardContent>
						</Card>
					</Grid>
				</TabPanel>
			</Grid>
		</Grid>
	)
}
