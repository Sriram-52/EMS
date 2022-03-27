import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Tooltip, Button } from '@material-ui/core'
import MetaInfo from '../../../../../utils/functions/metaInfo'
import MaterialTable from 'material-table'

export default function Presentation(props) {
	const metaInfo = new MetaInfo()
	const { articles, loading } = props
	const columns = [
		{
			title: 'Article',
			field: 'article',
			width: '40%',
			render: (rowData) => (
				<div style={{ display: 'flex' }}>
					<div className='d-flex'>
						<div>
							<Tooltip title={rowData.createdBy}>
								<Avatar src={rowData.photoUrl} />
							</Tooltip>
						</div>
						<div className='ml-4'>
							<Link to={'/console/wiki/' + rowData.id}>
								<Button
									type='a'
									style={{ textTransform: 'capitalize', color: '#4183c4' }}
									size='small'
								>
									{rowData.title}
								</Button>
							</Link>
						</div>
					</div>
				</div>
			),
			customFilterAndSearch: (value, rowData) => {
				return rowData.title.toLowerCase().includes(value.toLowerCase())
			},
		},
		{
			title: 'Updated On',
			field: 'updatedAt',
			type: 'date',
		},
		{
			title: 'Updated By',
			field: 'updatedBy',
		},
		{
			title: 'Created On',
			field: 'createdAt',
			type: 'date',
		},
		{
			title: 'Created By',
			field: 'createdBy',
		},
	]

	let data = []
	articles &&
		articles.forEach((article) => {
			data.push({
				title: article.title,
				createdAt: article.createdAt,
				createdBy: metaInfo.emailToName(article.createdBy),
				updatedAt: article.updatedAt,
				updatedBy: metaInfo.emailToName(article.updatedBy),
				photoUrl: metaInfo.getImage(article.createdBy),
				id: article.id,
			})
		})

	return (
		<div>
			<MaterialTable
				title=''
				columns={columns}
				data={data}
				isLoading={loading}
				options={{
					paginationType: 'normal',
					paginationPosition: 'top',
					pageSize: 10,
					rowStyle: {
						backgroundColor: '#fafafa',
					},
				}}
			/>
		</div>
	)
}
