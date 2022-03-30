import React from 'react'
import EmployeeEditables from '../EmployeeEditables'

function Presentation(props) {
	const { employeeId } = props
	return (
		<div>
			<h3>
				<u>Personal Information:</u>
			</h3>
			<EmployeeEditables employeeId={employeeId} />
		</div>
	)
}

export default Presentation
