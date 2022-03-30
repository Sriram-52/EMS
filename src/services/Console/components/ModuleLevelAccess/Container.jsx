import React, { useEffect, useState } from 'react'
import Presentation from './Presentation'
import { loadAllModules, updateModules } from '../../middleware'
import { useDispatch, useSelector } from 'react-redux'

export default function Container() {
	const [state, setState] = useState([])

	const dispatch = useDispatch()
	const allModules = useSelector((appState) => appState.console.allModules)
	const user = useSelector((appState) => appState.auth.signIn.data.user)

	useEffect(() => {
		dispatch(loadAllModules())
	}, [])

	useEffect(() => {
		if (!allModules.loading) {
			setState(allModules.data)
		}
	}, [JSON.stringify(allModules.data)])

	const handleChange = (e, actionIndex) => {
		const { name, checked } = e.target
		let list = JSON.stringify(state)
		list = JSON.parse(list)
		if (checked) {
			let items = []
			const pairs = {
				'wiki-manager': 'wiki',
				'timesheets-manager': 'timesheets',
				'immigration-manager': 'immigration',
				'task-management-manager': 'task-management',
				'employee-self-services-manager': 'employee-self-services',
				'accounts-manager': 'employees-manager',
			}
			if (Object.keys(pairs).includes(name)) items = [pairs[name], name]
			else items = [name]
			list[actionIndex]['accessibles'] = [
				...new Set([...list[actionIndex]['accessibles'], ...items]),
			]
		} else {
			const index = list[actionIndex]['accessibles'].indexOf(name)
			list[actionIndex]['accessibles'].splice(index, 1)
			const pairs = {
				wiki: 'wiki-manager',
				timesheets: 'timesheets-manager',
				immigration: 'immigration-manager',
				'task-management': 'task-management-manager',
				'employee-self-services': 'employee-self-services-manager',
				'employees-manager': 'accounts-manager',
			}
			if (
				Object.keys(pairs).includes(name) &&
				list[actionIndex]['accessibles'].indexOf(pairs[name]) !== -1
			)
				list[actionIndex]['accessibles'].splice(
					list[actionIndex]['accessibles'].indexOf(pairs[name]),
					1
				)
		}
		setState(list)
	}

	const handleUpdate = (index) => {
		const payload = {
			modules: state[index]['accessibles'],
		}
		dispatch(updateModules(state[index].uid, payload))
	}

	return (
		<div>
			<Presentation
				_logged_in_employee={user.uid}
				isLoaded={allModules.loading}
				modulesData={state}
				handleChange={handleChange}
				handleUpdate={handleUpdate}
			/>
		</div>
	)
}
