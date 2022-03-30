import React from 'react'
import { RenderProfileInfo } from '../../../utils/table'
import MetaInfo from '../../../../../utils/functions/metaInfo'
import validate from '../../../../../utils/functions/validation'

export default function Presentation(props) {
	const {
		profile: { workAuth = [], uid },
	} = props

	const metaInfo = new MetaInfo()

	let data = []

	if (workAuth.length) {
		const { type, docUrl, number, issueDate, expiryDate } = workAuth[0]
		data = [
			{ name: 'Type', value: type },
			{ name: 'Number', value: number },
			{
				name: 'Document',
				value:
					docUrl !== '' ? (
						<a href={docUrl} rel='noopener noreferrer' target='_blank'>
							<div
								style={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									width: '11rem',
								}}
							>
								{type + '_' + metaInfo.emailToName(uid)}
							</div>
						</a>
					) : (
						<span>No Document</span>
					),
			},
			{ name: 'valid from', value: validate.dateFormatter(issueDate) },
			{ name: 'Expiry date', value: validate.dateFormatter(expiryDate) },
		]
	} else {
		data = [
			{ name: 'Type', value: '' },
			{ name: 'Number', value: '' },
			{ name: 'Document', value: '' },
			{ name: 'valid from', value: '' },
			{ name: 'Expiry date', value: '' },
		]
	}

	return (
		<div>
			<h3>
				<u>
					<b>Work Authorization: </b>
				</u>
			</h3>
			<RenderProfileInfo data={data} />
		</div>
	)
}
