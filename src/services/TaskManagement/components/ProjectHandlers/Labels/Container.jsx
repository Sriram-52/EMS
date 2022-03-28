import React, { useEffect } from 'react'
import Presentation from './Presentation'
import {
	createLabels,
	updateLabels,
	deleteLabels,
} from '../../../middleware/ProjectHandlers/labels'
import { loadSelectedProject } from '../../../middleware/ProjectHandlers/index'
import { useDispatch, useSelector } from 'react-redux'

export default function Container(props) {
	const { projectId } = props

	const project = useSelector(
		(appState) => appState.task.projects.selectedProject.data
	)

	const dispatch = useDispatch()

	const checkColor = (name) => {
		const exp = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i
		return exp.test(name.trim())
	}

	useEffect(() => {
		if (Object.keys(project).length === 0)
			dispatch(loadSelectedProject(projectId))
	}, [projectId])

	const LabelNameValidation = {
		checkName: (name) => {
			const exp = /^[a-zA-Z \-  0-9\b]{1,}$/
			return exp.test(name.trim())
		},
	}

	const deleteLabel = (e, resolve, reject) => {
		const data = {
			labelId: e.id,
			projectId: projectId,
		}
		dispatch(deleteLabels(data, resolve, reject))
	}

	const updateLabel = (newData, oldData, resolve, reject) => {
		if (newData.label && newData.color) {
			if (checkColor(newData.color)) {
				if (LabelNameValidation.checkName(newData.label)) {
					const data = {
						projectId: projectId,
						payload: {
							labelName: newData.label,
							labelColorCode: newData.color,
						},
						labelId: newData.id,
					}

					dispatch(updateLabels(data, resolve, reject))
				} else {
					return alert(
						'Label name is invalid. No special charaters are allowed'
					)
				}
			} else {
				return alert('color code is invalid')
			}
		} else if (!newData.label) {
			return alert('Name should not be empty string')
		} else if (!newData.color) {
			return alert('Color should not be empty string')
		}
	}

	const createNewLabel = (newData, resolve, reject) => {
		if (newData.label && newData.color) {
			if (checkColor(newData.color)) {
				if (LabelNameValidation.checkName(newData.label)) {
					const payload = {
						labelName: newData.label,
						labelColorCode: newData.color,
					}
					dispatch(createLabels(payload, projectId, resolve, reject))
				} else {
					reject()
					return alert(
						'Label name is invalid. No special charaters are allowed'
					)
				}
			} else {
				reject()
				return alert('color code is invalid')
			}
		} else if (!newData.label) {
			reject()
			return alert('Name should not be empty string')
		} else if (!newData.color) {
			reject()
			return alert('Color should not be empty string')
		}
	}

	if (Object.keys(project).length === 0) return <Loader />

	return (
		<Presentation
			project={project}
			createNewLabel={createNewLabel}
			updateLabel={updateLabel}
			deleteLabel={deleteLabel}
		/>
	)
}
