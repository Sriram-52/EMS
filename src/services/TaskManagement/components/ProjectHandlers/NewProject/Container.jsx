import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newProject } from '../../../middleware/ProjectHandlers'
import Presentation from './Presentation'

export default function Container() {
	const [state, setState] = useState({
		name: '',
		status: '',
		startdate: '',
		enddate: '',
		projectId: '',
		employees: [],
		isCreated: false,
		useLabels: false,
		useTimeline: false,
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
		const payload = {
			title: state.name,
			status: state.status,
			startdate: new Date(state.startdate).setHours(0, 0, 0, 0),
			enddate: new Date(state.enddate).setHours(0, 0, 0, 0),
			cid: state.projectId,
			useLabels: state.useLabels,
			useTimeline: state.useTimeline,
			Users: state.employees,
		}
		dispatch(newProject(payload, callback))
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
