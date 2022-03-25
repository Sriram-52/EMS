import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	validateToken,
	setNewEmployeeDetails,
	registerEmployee as createEmployee,
} from '../../../middleware'
import Presentation from './Presentation'
import Loader from '../../../../../utils/components/loader'
import { useHistory } from 'react-router-dom'

export default function Container(props) {
	const {
		match: {
			params: { token },
		},
	} = props

	const history = useHistory()
	const dispatch = useDispatch()
	const { loading, data, error } = useSelector(
		(appState) => appState.employee.default.validateToken
	)
	const {
		newEmployeeState: { password, confirmPassword },
		registerEmployee,
	} = useSelector((appState) => appState.employee.default)

	const handleChange = (e) => {
		const { name, value } = e.target
		return dispatch(setNewEmployeeDetails({ key: name, value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		return dispatch(createEmployee(token, callback))
	}

	const callback = () => {
		history.push('/signIn')
	}

	useEffect(() => {
		dispatch(validateToken(token))
	}, [token])

	if (loading || error) {
		return <Loader />
	}

	return (
		<Presentation
			data={data}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			password={password}
			confirmPassword={confirmPassword}
			registerEmployee={registerEmployee}
		/>
	)
}
