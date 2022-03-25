import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNewEmployeeDetails } from '../../../middleware'
import Presentation from './Presentation'

export default function Container() {
	const mailingAddress = useSelector(
		(appState) => appState.employee.default.newEmployeeState.mailingAddress
	)

	const dispatch = useDispatch()

	const handleChange = (e) => {
		const { name, value } = e.target
		dispatch(
			setNewEmployeeDetails({ key: name, value, type: 'mailingAddress' })
		)
	}

	return (
		<Presentation mailingAddress={mailingAddress} handleChange={handleChange} />
	)
}
