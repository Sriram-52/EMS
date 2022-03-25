import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNewEmployeeDetails } from '../../../middleware'
import Presentation from './Presentation'

export default function Container() {
	const workAuth = useSelector(
		(appState) => appState.employee.default.newEmployeeState.workAuth
	)

	const dispatch = useDispatch()

	const handleChange = (e) => {
		const { name, value } = e.target
		dispatch(setNewEmployeeDetails({ key: name, value, type: 'workAuth' }))
	}

	return <Presentation workAuth={workAuth} handleChange={handleChange} />
}
