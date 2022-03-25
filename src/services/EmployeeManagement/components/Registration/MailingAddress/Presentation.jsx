import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { TextInput } from '../../../../../utils/components/formFields'

export default function Presentation(props) {
	const { mailingAddress, handleChange } = props
	const { line1, line2, city } = mailingAddress
	return (
		<Grid container spacing={2} className='p-2'>
			<Grid item xs={12}>
				<h3>
					<u>Mailing Address</u>
				</h3>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextInput
					required={true}
					label='Line 1'
					variant='outlined'
					value={line1}
					name='line1'
					handleChange={handleChange}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextInput
					label='Line 2'
					variant='outlined'
					name='line2'
					value={line2}
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
