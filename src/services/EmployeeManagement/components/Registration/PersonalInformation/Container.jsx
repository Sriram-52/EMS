import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNewEmployeeDetails } from '../../../middleware'
import Presentation from './Presentation'

export default function Container(props) {
	const { email } = props
	const personalDetails = useSelector(
		(appState) => appState.employee.default.newEmployeeState.personalDetails
	)

	const dispatch = useDispatch()

	const handleChange = (e) => {
		const { name, value } = e.target
		dispatch(
			setNewEmployeeDetails({ key: name, value, type: 'personalDetails' })
		)
	}

	useEffect(() => {
		dispatch(
			setNewEmployeeDetails({
				key: 'emailId',
				value: email,
				type: 'personalDetails',
			})
		)
	}, [email])

	return (
		<Presentation
			personalDetails={personalDetails}
			handleChange={handleChange}
		/>
	)
}
