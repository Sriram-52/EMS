import React from 'react'
import { RenderProfileInfo } from '../../../utils/table'
import validate from '../../../../../utils/functions/validation'

export default function Presentation(props) {
	const {
		profile: { employmentHistory = [] },
	} = props

	let data = []

	if (employmentHistory.length) {
		const {
			managerReferMail,
			fromDate,
			clientAddress,
			vendorEmail,
			toDate,
			vendorName,
			experience,
			vendorPhone,
			client,
		} = employmentHistory[0]
		data = [
			{
				name: 'Client',
				value: (
					<React.Fragment>
						<b>{client}</b>
						<br />
						{clientAddress}
						<br />
						{managerReferMail}
					</React.Fragment>
				),
			},
			{
				name: 'Vendor',
				value: (
					<React.Fragment>
						<b>{vendorName}</b>
						<br />
						{vendorPhone}
						<br />
						{vendorEmail}
					</React.Fragment>
				),
			},
			{ name: 'From Date', value: validate.dateFormatter(fromDate) },
			{ name: 'To Date', value: validate.dateFormatter(toDate) || 'Present' },
		]
	} else {
		data = [
			{ name: 'Client', value: '' },
			{ name: 'Vendor', value: '' },
			{ name: 'From Date', value: '' },
			{ name: 'To Date', value: '' },
		]
	}

	return (
		<div>
			<h3>
				<u>
					<b>Employment History:</b>
				</u>
			</h3>
			<RenderProfileInfo data={data} />
		</div>
	)
}
