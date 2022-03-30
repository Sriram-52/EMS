import React from 'react'
import { RenderProfileInfo } from '../../../utils/table'

export default function Presentation(props) {
	const {
		profile: { emergencyContact = [] },
	} = props

	let data = []

	if (emergencyContact.length) {
		const { name, phone, city } = emergencyContact[0]
		data = [
			{ name: 'Name', value: name },
			{ name: 'Phone', value: phone },
			{ name: 'City', value: city },
		]
	} else {
		data = [
			{ name: 'Name', value: '' },
			{ name: 'Phone', value: '' },
			{ name: 'City', value: '' },
		]
	}

	return (
		<div>
			<h3>
				<u>
					<b>Emergency Contact:</b>
				</u>
			</h3>
			<RenderProfileInfo data={data} />
		</div>
	)
}
