import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Presentation from './Presentation'
import {
	loadAllTasks,
	loadOpenTasks,
	loadInProgressTasks,
	loadReviewTasks,
	loadOverDueTasks,
	loadClosedTasks,
} from '../../../middleware/TaskHandlers/taskList'
import { loadSelectedProject } from '../../../middleware/ProjectHandlers'
import Loader from '../../../../../utils/components/loader'
import { ErrorFeedback } from '../../../../../utils/components/feedback'

export default function Container(props) {
	const { condition, projectId } = props

	const dispatch = useDispatch()

	const tabPair = ['all', 'open', 'inProgress', 'overDue', 'review', 'closed']
	const selectedProject = useSelector(
		(appState) => appState.task.projects.selectedProject
	)

	useEffect(() => {
		// ensuring that the selected project is loaded
		if (Object.keys(selectedProject.data).length === 0) {
			dispatch(loadSelectedProject(projectId))
		}
	}, [])

	useEffect(() => {
		switch (condition) {
			case 0:
				dispatch(loadAllTasks(projectId))
				break

			case 1:
				dispatch(loadOpenTasks(projectId))
				break

			case 2:
				dispatch(loadInProgressTasks(projectId))
				break

			case 3:
				dispatch(loadOverDueTasks(projectId))
				break

			case 4:
				dispatch(loadReviewTasks(projectId))
				break

			case 5:
				dispatch(loadClosedTasks(projectId))
				break

			default:
				break
		}
	}, [condition])

	if (selectedProject.loading) return <Loader />

	if (selectedProject.error)
		return <ErrorFeedback msg={selectedProject.error} severity={'error'} />

	return (
		<Presentation
			tabPair={tabPair}
			condition={condition}
			project={selectedProject.data}
		/>
	)
}
