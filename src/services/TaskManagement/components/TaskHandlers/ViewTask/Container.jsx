import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadSelectedTask } from '../../../middleware/TaskHandlers'
import { loadSelectedProject } from '../../../middleware/ProjectHandlers'
import Loader from '../../../../../utils/components/loader'
import Presentation from './Presentation'

export default function Container(props) {
	const {
		match: {
			params: { projectId, taskId },
		},
	} = props

	const dispatch = useDispatch()
	const selectedTask = useSelector(
		(appState) => appState.task.taskList.selectedTask
	)
	const selectedProject = useSelector(
		(appState) => appState.task.projects.selectedProject
	)

	useEffect(() => {
		dispatch(loadSelectedTask(projectId, taskId))
		if (Object.keys(selectedProject.data).length === 0) {
			dispatch(loadSelectedProject(projectId))
		}
	}, [projectId, taskId])

	if (selectedTask.loading || selectedProject.loading) return <Loader />

	return (
		<Presentation task={selectedTask.data} project={selectedProject.data} />
	)
}
