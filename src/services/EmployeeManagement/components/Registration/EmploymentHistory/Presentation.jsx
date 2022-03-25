import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import {
	TextInput,
	DateInput,
	EmailInput,
	PhoneInput,
} from '../../../../../utils/components/formFields'

export default function Presentation(props) {
	const { employmentHistory, handleChange } = props
	const {
		client,
		clientAddress,
		managerReferMail,
		vendorName,
		vendorPhone,
		vendorEmail,
		fromDate,
		toDate,
		experience,
	} = employmentHistory
	return (
		<Grid container spacing={2} className='p-2'>
			<Grid item xs={12}>
				<h3>
					<u>Employment History</u>
				</h3>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextInput
					label='Client'
					variant='outlined'
					value={client}
					name='client'
					handleChange={handleChange}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextInput
					label='Client address'
					variant='outlined'
					name='clientAddress'
					value={clientAddress}
					handleChange={handleChange}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<EmailInput
					label='Manager reference email'
					name='managerReferMail'
					value={managerReferMail}
					handleChange={handleChange}
					variant='outlined'
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextInput
					label='Vendor name'
					name='vendorName'
					value={vendorName}
					variant='outlined'
					handleChange={handleChange}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<PhoneInput
					label='Vendor phone'
					name='vendorPhone'
					value={vendorPhone}
					handleChange={handleChange}
					variant='outlined'
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<EmailInput
					label='Vendor email'
					name='vendorEmail'
					value={vendorEmail}
					handleChange={handleChange}
					variant='outlined'
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<DateInput
					label='From date'
					name='fromDate'
					value={fromDate}
					handleChange={handleChange}
					variant='outlined'
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<DateInput
					label='To date'
					name='toDate'
					value={toDate}
					handleChange={handleChange}
					variant='outlined'
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextInput
					label='Experience'
					name='experience'
					value={experience}
					handleChange={handleChange}
					variant='outlined'
				/>
			</Grid>
		</Grid>
	)
}
