import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNewEmployeeDetails } from '../../../middleware'
import Presentation from './Presentation'

export default function Container() {
	const employmentHistory = useSelector(
		(appState) => appState.employee.default.newEmployeeState.employmentHistory
	)

	const dispatch = useDispatch()

	const handleChange = (e) => {
		const { name, value } = e.target
		dispatch(
			setNewEmployeeDetails({ key: name, value, type: 'employmentHistory' })
		)
	}

	return (
		<Presentation
			employmentHistory={employmentHistory}
			handleChange={handleChange}
		/>
	)
}
