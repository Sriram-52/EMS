import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import {
	SelectInput,
	DateInput,
	AlphaNumericInput,
	FileInput,
} from '../../../../../utils/components/formFields'
import { workAuthTypes } from '../../../utils/lists'

export default function Presentation(props) {
	const { workAuth, handleChange } = props
	const { type, number, issueDate, expiryDate, docUrl } = workAuth
	return (
		<Grid container spacing={2} className='p-2'>
			<Grid item xs={12}>
				<h3>
					<u>Work Authorization</u>
				</h3>
			</Grid>
			<Grid item xs={12} sm={6}>
				<SelectInput
					required={true}
					label='Type'
					name='type'
					menuItems={workAuthTypes}
					handleChange={handleChange}
					variant='outlined'
					value={type}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<AlphaNumericInput
					required={true}
					label='Number'
					name='number'
					variant='outlined'
					handleChange={handleChange}
					value={number}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<DateInput
					label='Issue date'
					name='issueDate'
					handleChange={handleChange}
					required={true}
					variant='outlined'
					value={issueDate}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<DateInput
					label='Expiry date'
					name='expiryDate'
					handleChange={handleChange}
					required={true}
					variant='outlined'
					value={expiryDate}
				/>
			</Grid>
			<Grid item xs={12} sm={6} className='mt-2'>
				<FileInput
					label='Work Document'
					required={true}
					handleChange={handleChange}
					fileName={Date.now().toString()}
					filePath='Employees/WorkAuth/temp'
					variant='outlined'
					name='docUrl'
					value={docUrl}
				/>
			</Grid>
		</Grid>
	)
}
