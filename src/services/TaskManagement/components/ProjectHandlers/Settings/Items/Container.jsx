import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Presentation from './Presentation'
import MetaInfo from '../../../../../../utils/functions/metaInfo'
import { addMember } from '../../../../middleware/ProjectHandlers'

export default function Container(props) {
	const { projectId } = props

	const project = useSelector(
		(appState) => appState.task.projects.selectedProject.data
	)

	const dispatch = useDispatch()

	const metaInfo = new MetaInfo()

	const [projectMembers, setProjectMembers] = useState([])
	const [isCountExceeded, setIsCountExceeded] = useState(false)

	useEffect(() => {
		setProjectMembers(Object.values(project.Users).map(({ uid }) => uid))
	}, [projectId])

	const handleChange = (e) => {
		setProjectMembers(e.target.value)
	}

	useEffect(() => {
		let supervisorCount = 0
		projectMembers.forEach((uid) => {
			if (metaInfo.checkSupervisor(uid)) supervisorCount++
		})

		if (supervisorCount > 1) {
			setIsCountExceeded(true)
		}
	}, [projectMembers])

	const onAddMembers = () => {
		const payload = {
			employees: projectMembers,
			projectId: projectId,
		}
		dispatch(addMember(payload))
	}

	return (
		<Presentation
			projectId={projectId}
			handleProjectMembers={handleChange}
			isCountExceeded={isCountExceeded}
			projectMembers={projectMembers}
			project={project}
			onAddMembers={onAddMembers}
		/>
	)
}
