import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import calenderFormatter from '../../../../../utils/formatters/calenderFormatter'
import { updateProject } from '../../../middleware/ProjectHandlers'
import Presentation from './Presentation'

export default function Container(props) {
	const { projectId } = props

	const project = useSelector(
		(appState) => appState.task.projects.selectedProject.data
	)

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

	useEffect(() => {
		setState((prevState) => {
			return {
				...prevState,
				name: project.title,
				status: project.status,
				startdate: calenderFormatter.standardDateFormat(project.startdate),
				enddate: calenderFormatter.standardDateFormat(project.enddate),
				projectId: project.cid,
				useLabels: project.useLabels,
				useTimeline: project.useTimeline,
				employees: project.Users,
			}
		})
	}, [projectId])

	const dispatch = useDispatch()

	const handleChange = (e) => {
		const { name, value } = e.target
		setState({
			...state,
			[name]: value,
		})
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
		dispatch(updateProject(payload, projectId))
	}

	return (
		<Presentation
			state={state}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
		/>
	)
}
