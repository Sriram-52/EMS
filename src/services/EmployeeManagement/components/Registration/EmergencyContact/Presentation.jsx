import React from 'react'
import { Grid } from '@material-ui/core'
import {
	TextInput,
	PhoneInput,
} from '../../../../../utils/components/formFields'

export default function Presentation(props) {
	const { emergencyContact, handleChange } = props
	const { name, phone, city } = emergencyContact
	return (
		<Grid container spacing={2} className='p-2'>
			<Grid item xs={12}>
				<h3>
					<u>Emergency Contact</u>
				</h3>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextInput
					required={true}
					label='Name'
					name='name'
					value={name}
					variant='outlined'
					handleChange={handleChange}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<PhoneInput
					label='Phone'
					name='phone'
					value={phone}
					variant='outlined'
					handleChange={handleChange}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextInput
					required={true}
					label='City'
					name='city'
					value={city}
					handleChange={handleChange}
					variant='outlined'
				/>
			</Grid>
		</Grid>
	)
}
