import React from 'react'
import MaterialTable from 'material-table'
import { Chip } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validate from '../../../../../utils/functions/validation'
import MetaInfo from '../../../../../utils/functions/metaInfo'
import { RenderTitle, formatDueBy, customStyles } from '../../../utils/taskList'

export default function Presentation(props) {
	const { tabPair, condition, project } = props

	const { loading, data } = useSelector(
		(appState) => appState.task.taskList[tabPair[condition]]
	)

	const metaInfo = new MetaInfo()

	const columns = [
		{
			title: 'TaskId',
			field: 'projectTaskId',
			render: (rowData) => {
				return <Chip size='small' label={rowData.projectTaskId} />
			},
		},
		{
			title: 'Labels',
			field: 'labelsMap',
			render: (rowData) => {
				return rowData.labels.map((element) => (
					<span>
						<Chip
							size='small'
							style={{
								backgroundColor: `${element.colorCode}`,
								color: 'white',
								marginBottom: '2px',
							}}
							label={element.name}
						/>
						<br />
					</span>
				))
			},
		},
		{
			title: 'Title',
			field: 'title',
			render: (rowData) => {
				return (
					<div style={{ display: 'flex' }}>
						<span>
							<RenderTitle row={rowData} />
						</span>
					</div>
				)
			},
			width: 'auto',
		},
		{
			title: 'CreatedBy',
			field: 'createdByName',
		},
		{
			title: 'Due Passed By ',
			field: 'dueby',
			defaultSort: 'asc',
		},
		{ title: 'Priority', field: 'priority' },
		{
			title: 'Assignee',
			field: 'assignee',
			render: (row) => {
				return (
					row.assignees &&
					row.assignees.map((employee) => (
						<span>
							<Link to={'/console/employees/' + employee}>
								<Button
									type='a'
									style={
										employee in project.Users
											? customStyles.employeeExist
											: customStyles.employeeNonExist
									}
									size='small'
								>
									{metaInfo.emailToName(employee)}
								</Button>
							</Link>
							<br />
						</span>
					))
				)
			},
			dataType: '',
		},
	]

	const projectLabels = Object.values(project.labels).filter((e) => e.isExist)
	const rows = Object.values(data).map((task) => {
		return {
			title: task.title,
			id: task.id,
			cid: task.cid,
			startdate: validate.dateFormatter(task.startdate),
			enddate: validate.dateFormatter(task.enddate),
			status: task.status,
			assignees: task.assignee,
			createdByName: metaInfo.emailToName(task.createdBy),
			type: task.type,
			labels: projectLabels.filter(
				(item) => task.labels && Object.values(task.labels).includes(item.id)
			),
			assignee:
				task.assignee && task.assignee.map((e) => metaInfo.emailToName(e)),
			createdBy: task.createdBy,
			projectTaskId: project.cid + '-' + task.cid,
			category: task.category,
			priority: task.priority,
			taskId: task.category === 'subtask' ? task.taskId : '',
			dueby: formatDueBy(task.enddate, task.status),
			projectId: id,
			labelsList: projectLabels
				.filter(
					(item) =>
						task.labels &&
						Object.values(task.labels).filter((items) => items.id === item.id)
				)
				.map((e) => e.name),
			labelsMap: projectLabels
				.filter(
					(item) => task.labels && Object.values(task.labels).includes(item.id)
				)
				.map((item) => item.name)
				.join(' '),
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
