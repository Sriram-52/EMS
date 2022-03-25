import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Presentation from './Presentation'
import {
	loadActiveEmployees,
	loadAllEmployees,
	loadInActiveEmployees,
	loadSuspendedEmployees,
} from '../../../middleware/employeeList'

export default function Container(props) {
	const { condition } = props

	const dispatch = useDispatch()

	const tabPair = ['all', 'active', 'inActive', 'suspended']

	useEffect(() => {
		switch (condition) {
			case 0:
				dispatch(loadAllEmployees())
				break

			case 1:
				dispatch(loadActiveEmployees())
				break

			case 2:
				dispatch(loadInActiveEmployees())
				break

			case 3:
				dispatch(loadSuspendedEmployees())
				break

			default:
				break
		}
	}, [condition])

	return <Presentation tabPair={tabPair} condition={condition} />
}
