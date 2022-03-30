import React from 'react'
import { Grid } from '@material-ui/core'
import IdCard from '../IdCard'
import PersonalInformation from '../PersonalInformation/Index'
import EmploymentHistory from '../EmploymentHistory'
import EmergencyContact from '../EmergencyContact'
import WorkAuthorization from '../WorkAuthorization'

export default function Presentation(props) {
	const { employeeId } = props
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} sm={12} md={3}>
				<IdCard employeeId={employeeId} />
			</Grid>
			<Grid item xs={12} sm={12} md={8}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<PersonalInformation employeeId={employeeId} />
					</Grid>
					<Grid item xs={12}>
						<EmploymentHistory employeeId={employeeId} />
					</Grid>
					<Grid item xs={12}>
						<EmergencyContact employeeId={employeeId} />
					</Grid>
					<Grid item xs={12}>
						<WorkAuthorization employeeId={employeeId} />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}
