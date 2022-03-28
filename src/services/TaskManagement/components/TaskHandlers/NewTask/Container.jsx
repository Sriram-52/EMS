import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newProject } from '../../../middleware/ProjectHandlers'
import Presentation from './Presentation'

export default function Container(props) {
	const { projectId } = props

	const [state, setState] = useState({
		name: '',
		type: '',
		status: '',
		startdate: '',
		enddate: '',
		priority: '',
		labels: [],
		assignee: [],
		projectAssignee: [],
		isCreated: false,
		setReminder: false,
		reminderDate: '',
	})

	const [open, setOpen] = useState(false)

	const dispatch = useDispatch()

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		})
	}

	const callback = () => {
		handleClose()
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const data = {
			payload: {
				title: state.name,
				type: state.type,
				status: state.status,
				startdate: new Date(state.startdate).setHours(0, 0, 0, 0),
				enddate: new Date(state.enddate).setHours(0, 0, 0, 0),
				priority: state.priority,
				assignee: state.assignee,
				description: state.description
					? Object.values(state.description)[0]
					: '',
				labels: state.labels,
				setReminder: state.setReminder,
				reminderDate: state.reminderDate,
				category: 'task',
			},
			projectId: projectId,
		}
	}

	return (
		<Presentation
			state={state}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			open={open}
			handleClickOpen={handleClickOpen}
			handleClose={handleClose}
		/>
	)
}
