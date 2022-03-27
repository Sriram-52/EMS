import React from 'react'
import MaterialTable from 'material-table'
import MetaInfo from '../../../../utils/functions/metaInfo'
import validate from '../../../../utils/functions/validation'

function Presentation(props) {
	const { categories, onRowAdd, onRowDelete, onRowUpdate, loading } = props
	const columns = [
		{ title: 'Category', field: 'name' },
		{ title: 'Description', field: 'description' },
		{ title: 'Created On', field: 'createdAt' },
		{ title: 'Created By', field: 'createdBy' },
	]

	const data = []

	const predefinedCategoryNames = ['General', 'Knowledge']
	categories &&
		categories.forEach((item) => {
			if (predefinedCategoryNames.includes(item.name)) {
				data[predefinedCategoryNames.indexOf(item.name)] = {
					id: item.id,
					name: item.name,
					description: item.description,
					createdAt: validate.dateFormatter(item.createdAt),
					createdBy: new MetaInfo().emailToName(item.createdBy),
				}
			} else {
				data.push({
					id: item.id,
					name: item.name,
					description: item.description,
					createdAt: validate.dateFormatter(item.createdAt),
					createdBy: new MetaInfo().emailToName(item.createdBy),
				})
			}
		})

	return (
		<div>
			<div className='mb-3'>
				<h3 style={{ textDecoration: 'underline' }}>Note:</h3>Articles will be
				archived automatically against the deletion of the category
			</div>
			<MaterialTable
				title=''
				data={data}
				columns={columns}
				isLoading={loading}
				options={{
					paginationPosition: 'top',
					pageSize: 10,
				}}
				editable={{
					isEditable: (rowData) => {
						return rowData.name !== 'General' && rowData.name !== 'Knowledge'
					},
					isDeletable: (rowData) => {
						return rowData.name !== 'General' && rowData.name !== 'Knowledge'
					},
					onRowAdd: (newData) =>
						new Promise((resolve, reject) => {
							onRowAdd(
								{
									name: newData.name,
									description: newData.description,
								},
								resolve,
								reject
							)
						}),
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve, reject) => {
							onRowUpdate(
								{
									name: newData.name,
									description: newData.description,
								},
								oldData.id,
								resolve,
								reject
							)
						}),
					onRowDelete: (oldData) =>
						new Promise((resolve, reject) => {
							onRowDelete(oldData.id, resolve, reject)
						}),
				}}
			/>
		</div>
	)
}

export default Presentation
