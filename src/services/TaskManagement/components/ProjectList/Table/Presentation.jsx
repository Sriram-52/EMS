import React from 'react'
import MaterialTable from 'material-table'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validate from '../../../../../utils/functions/validation'

export default function Presentation(props) {
	const { tabPair, condition } = props

	const { loading, data } = useSelector(
		(appState) => appState.task.projectList[tabPair[condition]]
	)

	const columns = [
		{
			title: 'Project name',
			field: 'clientName',
			render: (row) => (
				<Link
					style={{ color: 'blue' }}
					to={`/console/projects/${row.id}/tasks`}
				>
					{row.clientName}
				</Link>
			),
		},
		{
			title: 'Start date',
			field: 'startDate',
			type: 'date',
		},
		{
			title: 'End date',
			field: 'endDate',
			type: 'date',
		},
		{ title: 'Project ID', field: 'cid' },
		{
			title: 'Status',
			field: 'status',
			lookup: { 0: 'Open', 1: 'Closed' },
		},
	]

	const statusList = ['Open', 'Closed']

	const rows = Object.values(data).map((item) => {
		return {
			clientName: item.title,
			id: item.id,
			cid: item.cid,
			startDate: validate.dateFormatter(item.startdate),
			endDate: validate.dateFormatter(item.enddate),
			status: statusList.indexOf(item.status),
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
