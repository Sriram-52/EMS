import React from 'react'
import { Container, Paper } from '@material-ui/core'
import PersonalInformation from '../PersonalInformation'
import MailingAddress from '../MailingAddress'
import EmergencyContact from '../EmergencyContact'
import EmploymentHistory from '../EmploymentHistory'
import WorkAuthorization from '../WorkAuthorization'
import {
	CustomButton,
	TextInput,
} from '../../../../../utils/components/formFields'

export default function Presentation(props) {
	const {
		data: { email },
		handleChange,
		handleSubmit,
		password,
		confirmPassword,
		registerEmployee: { loading },
	} = props
	return (
		<form onSubmit={handleSubmit} className='p-5'>
			<Container maxWidth='md' component={Paper} className='p-4'>
				<div className='mt-2'>
					<PersonalInformation email={email} />
				</div>
				<div className='mt-2'>
					<MailingAddress />
				</div>
				<div className='mt-2'>
					<EmergencyContact />
				</div>
				<div className='mt-2'>
					<EmploymentHistory />
				</div>
				<div className='mt-2'>
					<WorkAuthorization />
				</div>
				<div className='mt-4'>
					<TextInput
						label='Password'
						handleChange={handleChange}
						required={true}
						variant='outlined'
						name='password'
						value={password}
					/>
				</div>
				<div className='mt-4'>
					<TextInput
						label='Confirm Password'
						handleChange={handleChange}
						required={true}
						variant='outlined'
						name='confirmPassword'
						value={confirmPassword}
					/>
				</div>
				<div className='mt-4'>
					<CustomButton disabled={loading} type='submit' btnText='Register' />
				</div>
			</Container>
		</form>
	)
}
