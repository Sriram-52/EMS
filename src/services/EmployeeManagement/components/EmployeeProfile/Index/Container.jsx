import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadSelectedEmployee } from '../../../middleware/employeeList'
import Loader from '../../../../../utils/components/loader'
import Presentation from './Presentation'
import UnAuth from '../../../../../utils/components/unAuth'

export default function Container(props) {
	const { employeeId } = props

	const dispatch = useDispatch()
	const selectedEmployee = useSelector(
		(appState) => appState.employee.list.selectedEmployee
	)

	const modules = useSelector(
		(appState) => appState.employee.default.modules.data
	)
	const user = useSelector((appState) => appState.auth.signIn.data.user)

	useEffect(() => {
		dispatch(loadSelectedEmployee(employeeId))
	}, [employeeId])

	if (
		modules.includes('employees-manager') ||
		modules.includes('console-customization') ||
		user.uid === employeeId
	) {
		if (selectedEmployee.loading || !(employeeId in selectedEmployee.data))
			return <Loader />

		return <Presentation employeeId={employeeId} />
	}
	return <UnAuth />
}
