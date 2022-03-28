import React, { useEffect } from 'react'
import { loadTaskTimeLine } from '../../../middleware/TaskHandlers'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../../../utils/components/loader'
import Presentation from './Presentation'

export default function Container(props) {
	const { projectId, taskId } = props

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadTaskTimeLine(projectId, taskId))
	}, [projectId, taskId])

	const taskTimeline = useSelector((appState) => appState.task.tasks.timeline)

	if (taskTimeline.loading) return <Loader />

	return <Presentation taskTimeline={Object.values(taskTimeline.data)} />
}
