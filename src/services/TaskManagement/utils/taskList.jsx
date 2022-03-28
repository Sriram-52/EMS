import React from 'react'
import { Typography, Chip, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { HtmlTooltip } from '../../../utils/components/toolTip'
import { differenceInDays } from 'date-fns'

export function RenderTaskStatus(props) {
	const { row } = props
	if (row.status === 'Open') {
		return (
			<Chip
				variant='outlined'
				size='small'
				style={{
					borderColor: '#21ba45',
					fontWeight: 'bold',
					color: '#21ba45',
				}}
				label='Open'
			/>
		)
	}
	if (row.status === 'InProgress') {
		return (
			<Chip
				variant='outlined'
				size='small'
				style={{
					borderColor: '#f78a14',
					fontWeight: 'bold',
					color: '#f78a14',
				}}
				label='InProgress'
			/>
		)
	}
	return <Chip variant='outlined' size='small' label={row.status} />
}

export function RenderTaskType(props) {
	const { row } = props
	if (row.type === 'Task') {
		return (
			<Chip
				size='small'
				style={{ backgroundColor: '#17a2b8', color: 'white' }}
				label='Task'
			/>
		)
	}
	return (
		<Chip
			size='small'
			style={{ backgroundColor: '#db2828', color: 'white' }}
			label='Bug'
		/>
	)
}

export function RenderTaskName(props) {
	const { row } = props
	return (
		<HtmlTooltip
			title={
				<React.Fragment>
					<Typography className='text-center' color='inherit'>
						{row.title}
					</Typography>
				</React.Fragment>
			}
		>
			<Link
				to={`/console/projects/${row.projectId}/tasks/${row.id}`}
				style={{ marginLeft: '4px' }}
			>
				{row.title.trim().length > 35 ? (
					<Typography variant='body1'>
						{row.title.trim().substring(0, 35) + '...'}
						<br />
					</Typography>
				) : (
					<Typography variant='body1'>
						{row.title.trim()}
						<br />
					</Typography>
				)}
			</Link>
		</HtmlTooltip>
	)
}

export function RenderTitle(props) {
	const { row } = props
	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<RenderTaskName row={row} />
			</Grid>
			<Grid item xs={6}>
				<RenderTaskType row={row} />
			</Grid>
			<Grid item xs={6}>
				<RenderTaskStatus row={row} />
			</Grid>
			<Grid item xs={6}>
				<Typography>{row.startdate}</Typography>
			</Grid>
			<Grid item xs={6}>
				<Typography>{row.enddate}</Typography>
			</Grid>
		</Grid>
	)
}

export const customStyles = {
	employeeExist: {
		color: '#4183c4',
		textTransform: 'capitalize',
	},
	employeeNonExist: {
		color: '#626466',
		textTransform: 'capitalize',
	},
}

const getDueBy = (enddate, status) => {
	if (status === 'Completed' || status === 'Closed') return false
	return new Date().setHours(0, 0, 0, 0) -
		new Date(enddate).setHours(0, 0, 0, 0) >
		0
		? true
		: false
}

export const formatDueBy = (enddate, status) => {
	if (getDueBy(enddate, status)) {
		const days = differenceInDays(
			new Date().setHours(0, 0, 0, 0),
			new Date(enddate).setHours(0, 0, 0, 0)
		)
		if (days === 1) return days.toString() + ' day'
		return days.toString() + ' days'
	}
	return '---'
}
