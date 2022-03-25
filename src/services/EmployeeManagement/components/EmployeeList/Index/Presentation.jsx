import React from 'react'
import InviteEmployeeDialog from '../../InviteEmployee/Dialog'
import EmployeeListTabs from '../Tabs'
import { IoMdPersonAdd } from 'react-icons/io'

export default function Presentation() {
	return (
		<div>
			<div className='mb-4'>
				<InviteEmployeeDialog
					heading='Invite new employee'
					text='Enter the email address of the new employee'
					btnText={
						<span>
							<IoMdPersonAdd style={{ marginRight: '6px' }} size={18} />
							Invite new employee
						</span>
					}
				/>
			</div>
			<EmployeeListTabs />
		</div>
	)
}
