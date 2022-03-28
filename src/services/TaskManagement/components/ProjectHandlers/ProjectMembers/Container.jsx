import React, { useEffect } from 'react'
import Presentation from './Presentation'
import { useDispatch } from 'react-redux'
import {
	removeMember,
	updatePermissions,
} from '../../../middleware/ProjectHandlers'

export default function Container(props) {
	const { assignees, projectId } = props

	const [state, setState] = React.useState({
		assignees: assignees,
		initialAssignee: [],
	})

	const dispatch = useDispatch()

	useEffect(() => {
		setState({
			assignees: assignees,
		})
	}, [assignees])

	const handleUpdateLevels = (uid) => {
		let level = state.assignees.filter((assignee) => uid === assignee.uid)[0]

		const payload = {
			permissionLevels: {
				uid,
				create: level.create,
				update: level.update,
				read: level.read,
				delete: level.delete,
			},
		}

		dispatch(updatePermissions(payload, projectId))
	}

	const handleRemove = (uid) => {
		let data = {
			employees: [uid],
			projectId: projectId,
		}
		dispatch(removeMember(removeMember(data)))
	}

	const handleLevelChange = (uid, permission, key) => {
		let currState = JSON.parse(JSON.stringify(state))
		let accessLevels = currState.assignees
		accessLevels.forEach((access, index) => {
			if (access.uid === uid) {
				accessLevels[index][key] = !permission
			}
		})
		setState({
			...state,
			assignees: accessLevels,
		})
	}

	return (
		<Presentation
			assignees={state.assignees}
			handleLevelChange={handleLevelChange}
			handleUpdateLevels={handleUpdateLevels}
			handleRemove={handleRemove}
		/>
	)
}
