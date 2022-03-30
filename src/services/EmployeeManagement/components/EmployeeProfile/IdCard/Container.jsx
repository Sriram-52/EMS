import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Presentation from './Presentation'

export default function Container(props) {
	const { employeeId } = props

	const dispatch = useDispatch()

	const selectedEmployee = useSelector(
		(appState) => appState.employee.list.selectedEmployee
	)

	return (
		<Presentation
			profile={selectedEmployee.data[employeeId]}
			employeeId={employeeId}
		/>
	)
}
