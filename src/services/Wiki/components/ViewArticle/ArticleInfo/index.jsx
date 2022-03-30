import React from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import validate from '../../../../../utils/functions/validation'
import MetaInfo from '../../../../../utils/functions/metaInfo'

export default function ArticleInfo(props) {
	const { data, categoryMetaInfo } = props
	const metaInfo = new MetaInfo()
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Typography variant='h5' color='textSecondary'>
					Filed Under
				</Typography>
				<Typography variant='h5' style={{ textTransform: 'capitalize' }}>
					{categoryMetaInfo.types[data.categoryId]
						? categoryMetaInfo.types[data.categoryId]
						: categoryMetaInfo.archived[data.categoryId]}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
			<Grid item xs={12}>
				<Typography variant='h5' color='textSecondary'>
					Created On
				</Typography>
				<Typography variant='h5' style={{ textTransform: 'capitalize' }}>
					{validate.dateFormatter(data.createdAt)}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
			<Grid item xs={12}>
				<Typography variant='h5' color='textSecondary'>
					Created By
				</Typography>
				<Typography variant='h5' style={{ textTransform: 'capitalize' }}>
					{metaInfo.emailToName(data.createdBy)}
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
		</Grid>
	)
}
