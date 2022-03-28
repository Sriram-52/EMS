import React from 'react'
import { useSelector } from 'react-redux'
import Presentation from './Presentation'

export default function Container(props) {
	const { projectId, taskId } = props

	const selectedProject = useSelector(
		(appState) => appState.task.projects.selectedProject.data
	)
	const selectedTask = useSelector(
		(appState) => appState.task.taskList.selectedTask.data
	)

	return <Presentation task={selectedTask} project={selectedProject} />
}
