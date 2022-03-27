import React from 'react'
import MaterialTable from 'material-table'
import MetaInfo from '../../../../utils/functions/metaInfo'
import validate from '../../../../utils/functions/validation'
import { Link } from 'react-router-dom'

function Presentation(props) {
	const { loading, history, categoryMetaInfo } = props
	const metaInfo = new MetaInfo()
	const columns = [
		{
			title: 'Article Title',
			field: 'title',
			render: (rowData) => (
				<span>
					<Link
						to={'/console/wiki/' + rowData.articleId + '/' + rowData.historyId}
					>
						{rowData.title}
					</Link>
				</span>
			),
		},
		{ title: 'Category', field: 'category' },
		{ title: 'Type', field: 'type' },
		{ title: 'Created On', field: 'createdAt' },
		{ title: 'Created By', field: 'createdBy' },
	]

	const data = []

	history &&
		history.forEach((doc) => {
			const { title, categoryId } = doc.eventDetails.after
			data.push({
				title,
				category: categoryMetaInfo[categoryId],
				createdAt: validate.dateAndTimeFormatter(doc.createdAt),
				createdBy: metaInfo.emailToName(doc.actionBy),
				type: doc.type,
				historyId: doc.id,
				articleId: doc.subject.wikiArticleId,
			})
		})

	return (
		<div>
			<MaterialTable
				title=''
				data={data}
				columns={columns}
				isLoading={loading}
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
		</div>
	)
}

export default Presentation
