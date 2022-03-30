import React from 'react'
import { RenderProfileInfo } from '../../../../utils/table'
import validate from '../../../../../../utils/functions/validation'

export default function Presentation(props) {
	const { profile } = props
	const {
		personalDetails: {
			firstName,
			lastName,
			middleName,
			dob,
			gender,
			maritalStatus,
			phoneNumber,
		},
		email,
		uid,
		mailingAddress: { line1, line2, city, state, country, zip },
	} = profile

	const data = [
		{
			name: 'Name',
			value: [firstName, middleName, lastName].filter((item) => item).join(' '),
		},
		{ name: 'Employee ID', value: uid },
		{ name: 'Email', value: email },
		{ name: 'Phone', value: phoneNumber },
		{
			name: 'Address',
			value: [line1, line2, city, state, country, zip].join(','),
		},
		{ name: 'Date of birth', value: validate.dateFormatter(dob) },
		{ name: 'Gender', value: gender },
		{ name: 'Marital status', value: maritalStatus },
	]

	return <RenderProfileInfo data={data} />
}
