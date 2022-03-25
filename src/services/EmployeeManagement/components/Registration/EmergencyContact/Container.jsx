import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNewEmployeeDetails } from '../../../middleware'
import Presentation from './Presentation'

export default function Container() {
	const emergencyContact = useSelector(
		(appState) => appState.employee.default.newEmployeeState.emergencyContact
	)

	const dispatch = useDispatch()

	const handleChange = (e) => {
		const { name, value } = e.target
		dispatch(
			setNewEmployeeDetails({ key: name, value, type: 'emergencyContact' })
		)
	}

	return (
		<Presentation
			emergencyContact={emergencyContact}
			handleChange={handleChange}
		/>
	)
}
