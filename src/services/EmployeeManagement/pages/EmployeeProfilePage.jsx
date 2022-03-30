import React from 'react'
import EmployeeProfile from '../components/EmployeeProfile/Index'

export default function EmployeeProfilePage(props) {
	const {
		match: {
			params: { employeeId },
		},
	} = props
	return <EmployeeProfile employeeId={employeeId} />
}
