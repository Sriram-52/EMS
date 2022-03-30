import React from 'react'
import { useSelector } from 'react-redux'
import EmployeeProfile from '../components/EmployeeProfile/Index'

export default function EmployeeProfilePage() {
	const user = useSelector((appState) => appState.auth.signIn.data.user)
	return <EmployeeProfile employeeId={user.uid} />
}
