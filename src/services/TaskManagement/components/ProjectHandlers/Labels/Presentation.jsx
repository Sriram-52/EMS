import React from 'react'
import MaterialTable from 'material-table'

export default function Presentation(props) {
	const { updateLabel, createNewLabel, deleteLabel, project } = props

	const columns = [
		{ title: 'Label', field: 'label' },
		{
			title: 'Color',
			field: 'color',
			render: (rowData) => (
				<span
					className='p-2 rounded'
					style={{ backgroundColor: `${rowData.color}` }}
				>
					{rowData.color}
				</span>
			),
		},
	]

	let labels = project.labels || {}
	const data = Object.values(labels)
		.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
		.filter((e) => e.isExist)
		.map((e) => {
			return {
				label: e.name,
				color: e.colorCode.includes('#')
					? e.colorCode.length > 7
						? e.colorCode.substr(0, 7)
						: e.colorCode
					: e.colorCode,
				id: e.id,
			}
		})

	return (
		<MaterialTable
			title='Labels'
			columns={columns}
			data={data}
			editable={{
				onRowAdd: (newData) => {
					return new Promise((resolve, reject) => {
						createNewLabel(newData, resolve, reject)
					})
				},

				onRowUpdate: (newData, oldData) => {
					return new Promise((resolve, reject) => {
						updateLabel(newData, oldData, resolve, reject)
					})
				},

				onRowDelete: (oldData) => {
					return new Promise((resolve, reject) => {
						deleteLabel(oldData, resolve, reject)
					})
				},
			}}
		/>
	)
}
