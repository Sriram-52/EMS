import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Presentation from './Presentation'

export default function Container(props) {
	const { onChange, defaultEmp = [], name } = props

	const [selected, setSelected] = useState([])

	const employees = useSelector(
		(appState) => appState.default.metaInfo.data.employees
	)

	useEffect(() => {
		setSelected(defaultEmp)
	}, [])

	const handleChange = (values) => {
		setSelected(values)
		onChange({ target: { value: values, name } })
	}

	return (
		<Presentation
			employees={employees}
			handleChange={handleChange}
			selected={selected}
		/>
	)
}
