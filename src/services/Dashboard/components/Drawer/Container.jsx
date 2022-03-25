import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Presentation from './Presentation'
import { getEmployeeModules } from '../../../EmployeeManagement/middleware'
import Loader from '../../../../utils/components/loader'
import { signOut } from '../../../Authentication/middleware'

export default function Container() {
	const { loading, data, error } = useSelector(
		(appState) => appState.employee.default.modules
	)
	const user = useSelector((appState) => appState.auth.signIn.data.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getEmployeeModules())
	}, [])

	const handleSignOut = () => {
		dispatch(signOut())
	}

	if (error) {
		console.error(error)
	}

	if (loading) return <Loader />

	return (
		<Presentation
			accessModules={data}
			user={user}
			handleSignOut={handleSignOut}
		/>
	)
}
