import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Presentation from './Presentation'
import {
	loadAllProjects,
	loadOverDueProjects,
	loadClosedProjects,
	loadInProgressProjects,
} from '../../../middleware/ProjectHandlers'

export default function Container(props) {
	const { condition } = props

	const dispatch = useDispatch()

	const tabPair = ['all', 'inProgress', 'overDue', 'closed']

	useEffect(() => {
		switch (condition) {
			case 0:
				dispatch(loadAllProjects())
				break

			case 1:
				dispatch(loadInProgressProjects())
				break

			case 2:
				dispatch(loadOverDueProjects())
				break

			case 3:
				dispatch(loadClosedProjects())
				break

			default:
				break
		}
	}, [condition])

	return <Presentation tabPair={tabPair} condition={condition} />
}
