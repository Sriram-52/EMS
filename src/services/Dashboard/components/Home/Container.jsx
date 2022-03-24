import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Presentation from './Presentation'
import { getEmployeeModules } from '../../../EmployeeManagement/middleware'

export default function Container() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getEmployeeModules())
	}, [])

	return (
		<div>
			<Presentation />
		</div>
	)
}
