import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadSelectedProject } from '../../../middleware/ProjectHandlers'
import Presentation from './Presentation'
import Loader from '../../../../../utils/components/loader'

export default function Container(props) {
	const {
		match: {
			params: { projectId },
		},
	} = props

	const dispatch = useDispatch()
	const { loading } = useSelector(
		(appState) => appState.task.projects.selectedProject
	)

	const modules = useSelector(
		(appState) => appState.employee.default.modules.data
	)

	useEffect(() => {
		dispatch(loadSelectedProject(projectId))
	}, [projectId])

	if (loading) return <Loader />

	return (
		<div>
			<Presentation modules={modules} projectId={projectId} />
		</div>
	)
}
