import React from 'react'
import MaterialTable from 'material-table'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Chip, Button } from '@material-ui/core'
import validate from '../../../../../utils/functions/validation'
import { branchList, departmentList } from '../../../utils/lists'

export default function Presentation(props) {
	const { tabPair, condition } = props

	const { loading, data } = useSelector(
		(appState) => appState.employee.list[tabPair[condition]]
	)

	const columns = [
		{
			title: 'Name',
			field: 'name',
		},
		{ title: 'Email', field: 'email' },
		{ title: 'Phone', field: 'phone' },
		{
			title: 'Branch',
			field: 'branch',
			lookup: {
				0: 'ATL',
				1: 'NJ',
				2: 'NC',
				3: 'FL',
				4: 'DAL',
				5: 'AUS',
				6: 'SA',
				7: 'VA',
				8: 'STL',
				9: 'MN',
				10: 'CA-N',
				11: 'CA',
				12: 'SFO',
				13: 'OH',
				14: 'GVRM-IND',
			},
		},
		{
			title: 'Employee ID',
			field: 'employeeId',
			defaultSort: 'asc',
			render: (rowData) => {
				return (
					<Link
						style={{ color: 'blue', textDecoration: 'none' }}
						to={'/console/employees/' + rowData.employeeId}
					>
						{rowData.employeeId}
					</Link>
				)
			},
		},
		{
			title: 'Department',
			field: 'department',
			lookup: {
				0: 'Java',
				1: 'DevOps/Cloud',
				2: 'Networking/Security',
				3: 'Python',
				4: 'QA',
				5: '.Net',
				6: 'Data Science',
				7: 'Big Data',
				8: 'CRM',
				9: 'Legal',
				10: 'HR',
				11: 'Accounts',
				12: 'Bench sales',
			},
		},
		{
			title: 'Status',
			field: 'status',
			lookup: {
				0: 'Active',
				1: 'In Active',
				2: 'Suspended',
			},
			render: (rowData) => {
				if (rowData.status === 0)
					return (
						<Chip
							style={{
								width: '100%',
								backgroundColor: '#21ba45',
								color: 'white',
							}}
							label='Active'
						/>
					)
				else if (rowData.status === 2)
					return (
						<Chip
							style={{
								width: '100%',
								backgroundColor: '#db2828',
								color: 'white',
							}}
							label='Suspended'
						/>
					)
				return (
					<Chip
						style={{ width: '100%', backgroundColor: 'orange', color: 'white' }}
						label='InActive'
					/>
				)
			},
			customFilterAndSearch: (value, rowData) => {
				if (value.length === 0) return true
				return value.includes(rowData.status.toString())
			},
		},
		{
			title: 'Actions',
			field: '',
		},
	]

	const statusList = ['active', 'inActive', 'suspended']

	const rows = Object.values(data).map((item) => {
		const { personalDetails } = item
		if (item.status === 'active') {
			return {
				name: `${personalDetails.firstName} ${personalDetails.lastName}`,
				email: `${personalDetails.emailId}`,
				phone: `${personalDetails.phoneNumber}`,
				branch: '',
				employeeId: item.uid,
				employeeStatus: `${personalDetails.employeeStatus}`,
				department: `${personalDetails.department}`,
				jobTitle: '',
				status: statusList.indexOf(item.status),
			}
		} else {
			return {
				name: `${personalDetails.firstName} ${personalDetails.lastName}`,
				email: `${personalDetails.email}`,
				phone: `${personalDetails.phoneNumber}`,
				branch: branchList.indexOf(personalDetails.branch) || -1,
				employeeId: '',
				employeeStatus: '',
				department: departmentList.indexOf(personalDetails.department) || -1,
				jobTitle: '',
				status: statusList.indexOf(item.status) || -1,
			}
		}
	})

	return (
		<MaterialTable
			title=''
			data={rows}
			isLoading={loading}
			columns={columns}
			options={{
				pageSize: 10,
				paginationPosition: 'top',
				paginationType: 'normal',
				filtering: true,
				selection: true,
				columnsButton: true,
				exportButton: true,
			}}
		/>
	)
}
