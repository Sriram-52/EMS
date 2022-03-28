import React, { useEffect } from 'react'
import Presentation from './Presentation'
import { useSelector, useDispatch } from 'react-redux'
import { loadProjectTimeLine } from '../../../middleware/ProjectHandlers'
import Loader from '../../../../../utils/components/loader'

export default function Container(props) {
	const { projectId } = props

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadProjectTimeLine(projectId))
	}, [])

	const timeline = useSelector((appState) => appState.task.projects.timeline)

	if (timeline.loading) return <Loader />

	return <Presentation timelines={timeline} projectId={projectId} />
}
