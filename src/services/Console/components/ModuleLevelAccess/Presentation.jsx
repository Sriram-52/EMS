import React from 'react'
import MaterialTable from 'material-table'
import MetaInfo from '../../../../utils/functions/metaInfo'
import { Link } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

function Presentation(props) {
	const {
		isLoaded,
		modulesData,
		handleChange,
		handleUpdate,
		_logged_in_employee,
	} = props
	const metaInfo = new MetaInfo()
	const columns = [
		{
			title: 'Employee',
			field: 'employee',
			render: ({ employee, empCode }) => (
				<Link to={`/console/employees/${empCode}`}>{employee}</Link>
			),
			width: '150px',
		},
		{
			title: 'Wiki',
			field: 'wiki',
			render: ({ wiki, index }) => (
				<Checkbox
					checked={wiki}
					name='wiki'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'Timesheets',
			field: 'timesheets',
			render: ({ timesheets, index }) => (
				<Checkbox
					checked={timesheets}
					name='timesheets'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'Immigration',
			field: 'immigration',
			render: ({ immigration, index }) => (
				<Checkbox
					checked={immigration}
					name='immigration'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'Task Management',
			field: 'taskManagement',
			render: ({ taskManagement, index }) => (
				<Checkbox
					checked={taskManagement}
					name='task-management'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'Employee Self Service',
			field: 'ess',
			render: ({ ess, index }) => (
				<Checkbox
					checked={ess}
					name='employee-self-services'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'Discussions',
			field: 'discussions',
			render: ({ discussions, index }) => (
				<Checkbox
					checked={discussions}
					name='discussions'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'Accounts',
			field: 'accounts',
			render: ({ accounts, index }) => (
				<Checkbox
					checked={accounts}
					name='accounts'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'Employees Manager',
			field: 'employeesManager',
			render: ({ employeesManager, index }) => (
				<Checkbox
					checked={employeesManager}
					name='employees-manager'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'Console Customization',
			field: 'consoleCustomization',
			render: ({ consoleCustomization, index }) => (
				<Checkbox
					checked={consoleCustomization}
					name='console-customization'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'Wiki Manager',
			field: 'wikiManager',
			render: ({ wikiManager, index }) => (
				<Checkbox
					checked={wikiManager}
					name='wiki-manager'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'Timesheets Manager',
			field: 'timesheetsManager',
			render: ({ timesheetsManager, index }) => (
				<Checkbox
					checked={timesheetsManager}
					name='timesheets-manager'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'Immigration Manager',
			field: 'immigrationManager',
			render: ({ immigrationManager, index }) => (
				<Checkbox
					checked={immigrationManager}
					name='immigration-manager'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'Accounts Manager',
			field: 'accountsManager',
			render: ({ accountsManager, index }) => (
				<Checkbox
					checked={accountsManager}
					name='accounts-manager'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'Task Management Manager',
			field: 'taskManagementManager',
			render: ({ taskManagementManager, index }) => (
				<Checkbox
					checked={taskManagementManager}
					name='task-management-manager'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'ESS Manager',
			field: 'essManager',
			render: ({ essManager, index }) => (
				<Checkbox
					checked={essManager}
					name='employee-self-services-manager'
					onChange={(e) => handleChange(e, index)}
				/>
			),
		},
		{
			title: 'Action',
			field: '',
			render: ({ index, empCode }) => (
				<Button
					onClick={() => handleUpdate(index)}
					disabled={empCode === _logged_in_employee}
					color='secondary'
					variant='contained'
				>
					Update
				</Button>
			),
			width: '150px',
		},
	]

	const data = (modulesData || []).map((doc, index) => {
		const modules = doc.accessibles
		const uid = doc.uid
		return {
			wiki: modules.includes('wiki'),
			timesheets: modules.includes('timesheets'),
			accounts: modules.includes('accounts'),
			immigration: modules.includes('immigration'),
			taskManagement: modules.includes('task-management'),
			ess: modules.includes('employee-self-services'),
			discussions: modules.includes('discussions'),
			employeesManager: modules.includes('employees-manager'),
			consoleCustomization: modules.includes('console-customization'),
			wikiManager: modules.includes('wiki-manager'),
			timesheetsManager: modules.includes('timesheets-manager'),
			immigrationManager: modules.includes('immigration-manager'),
			accountsManager: modules.includes('accounts-manager'),
			taskManagementManager: modules.includes('task-management-manager'),
			essManager: modules.includes('employee-self-services-manager'),
			imageURL: metaInfo.getImage(uid),
			empCode: uid,
			employee: metaInfo.emailToName(uid),
			index,
		}
	})

	return (
		<div>
			<MaterialTable
				title=''
				data={data}
				columns={columns}
				isLoading={isLoaded}
				options={{
					paginationPosition: 'top',
					pageSize: 10,
					fixedColumns: { left: 1, right: 1 },
				}}
			/>
		</div>
	)
}

export default Presentation
