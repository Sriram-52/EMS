import React from 'react'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'

export default function Presentation(props) {
	const { employees, handleChange, selected } = props

	const employeesList = Object.values(employees)

	return (
		<Autocomplete
			multiple={true}
			filterSelectedOptions
			options={employeesList.map((item) => item.uid)}
			getOptionLabel={(option) => employees[option].name || option}
			value={selected}
			onChange={(e, v) => handleChange(v)}
			renderInput={(params) => {
				return (
					<TextField {...params} label='Add Employees' size='small' fullWidth />
				)
			}}
		/>
	)
}
