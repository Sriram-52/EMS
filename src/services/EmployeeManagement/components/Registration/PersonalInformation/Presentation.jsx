import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import {
	TextInput,
	SelectInput,
	DateInput,
	EmailInput,
	PhoneInput,
} from '../../../../../utils/components/formFields'
import {
	departmentList,
	genderList,
	maritalStatusList,
} from '../../../utils/lists'

export default function Presentation(props) {
	const { handleChange, personalDetails } = props
	const {
		firstName,
		lastName,
		middleName,
		emailId,
		dob,
		department,
		phoneNumber,
		maritalStatus,
		gender,
	} = personalDetails
	return (
		<Grid container spacing={2} className='p-2'>
			<Grid item xs={12}>
				<h3>
					<u>Personal Information</u>
				</h3>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextInput
					required={true}
					label='First Name'
					variant='outlined'
					name='firstName'
					handleChange={handleChange}
					value={firstName}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextInput
					label='Middle Name'
					variant='outlined'
					name='middleName'
					value={middleName}
					handleChange={handleChange}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextInput
					required={true}
					label='Last Name'
					handleChange={handleChange}
					name='lastName'
					variant='outlined'
					value={lastName}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<EmailInput
					required={true}
					label='Email'
					variant='outlined'
					name='emailId'
					disabled={true}
					value={emailId}
					handleChange={handleChange}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<PhoneInput
					required={true}
					label='Phone Number'
					name='phoneNumber'
					value={phoneNumber}
					handleChange={handleChange}
					variant='outlined'
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<SelectInput
					label='Department'
					value={department}
					menuItems={departmentList}
					handleChange={handleChange}
					name='department'
					variant='outlined'
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<SelectInput
					label='Marital Status'
					value={maritalStatus}
					menuItems={maritalStatusList}
					handleChange={handleChange}
					name='maritalStatus'
					variant='outlined'
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<SelectInput
					label='Gender'
					menuItems={genderList}
					value={gender}
					name='gender'
					handleChange={handleChange}
					variant='outlined'
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<DateInput
					label='Date of birth'
					name='dob'
					value={dob}
					handleChange={handleChange}
					required={true}
					variant='outlined'
				/>
			</Grid>
		</Grid>
	)
}
