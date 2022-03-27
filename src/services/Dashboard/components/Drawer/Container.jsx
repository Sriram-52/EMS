import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Presentation from './Presentation'
import { getEmployeeModules } from '../../../EmployeeManagement/middleware'
import Loader from '../../../../utils/components/loader'
import { signOut } from '../../../Authentication/middleware'
import { getMetaInfo } from '../../middleware'

export default function Container() {
	const { loading, data, error } = useSelector(
		(appState) => appState.employee.default.modules
	)
	const user = useSelector((appState) => appState.auth.signIn.data.user)
	const metaInfo = useSelector((appState) => appState.default.metaInfo)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getEmployeeModules())
		dispatch(getMetaInfo())
	}, [])

	const loaderCondition = () => {
		let flag = false
		if (loading || error || Object.keys(metaInfo.data).length === 0) {
			flag = true
		}
		return flag
	}

	const handleSignOut = () => {
		dispatch(signOut())
	}

	if (loaderCondition()) return <Loader />

	return (
		<Presentation
			accessModules={data}
			user={user}
			handleSignOut={handleSignOut}
		/>
	)
}
