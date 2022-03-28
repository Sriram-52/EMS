import React from 'react'
import { Grid } from '@material-ui/core'
import {
	DateInput,
	SelectInput,
	TextInput,
	CheckBoxInput,
	CustomButton,
} from '../../../../../utils/components/formFields'

export default function Presentation(props) {
	const { handleChange, handleSubmit, state } = props
	return (
		<Grid component='form' onSubmit={handleSubmit} container spacing={2}>
			<Grid item xs={12} sm={6}>
				<TextInput
					name='name'
					label='Name'
					required={true}
					handleChange={handleChange}
					value={state.name}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextInput
					name='projectId'
					label='Project ID'
					required
					handleChange={handleChange}
					value={state.projectId}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<DateInput
					label='Start date'
					handleChange={handleChange}
					name='startdate'
					required={true}
					value={state.startdate}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<DateInput
					label='End date'
					handleChange={handleChange}
					name='enddate'
					required={true}
					value={state.enddate}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<SelectInput
					menuItems={['Open', 'Closed']}
					name='status'
					label='Status'
					required
					handleChange={handleChange}
					value={state.status}
				/>
			</Grid>
			<Grid item xs={12} sm={3}>
				<CheckBoxInput
					name='useLabels'
					label='Labels'
					handleChange={handleChange}
					value={state.useLabels}
				/>
			</Grid>
			<Grid item xs={12} sm={3}>
				<CheckBoxInput
					name='useTimeline'
					label='Timeline'
					handleChange={handleChange}
					value={state.useTimeline}
				/>
			</Grid>
			<Grid item xs={12}>
				<CustomButton color='secondary' btnText='Update' type='submit' />
			</Grid>
		</Grid>
	)
}
