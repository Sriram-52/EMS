import React, { useState } from 'react'
import { Tab, Tabs, Grid, makeStyles } from '@material-ui/core'
import TabPanel from '../../../../../utils/components/tabPanel'
import Articles from '../Articles'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
		overflow: 'visible',
	},
	grid: {
		padding: theme.spacing(10),
	},
}))

function Presentation(props) {
	const { categories } = props
	const [value, setValue] = useState(0)
	const handleChange = (_, v) => {
		setValue(v)
	}
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Tabs
				orientation='vertical'
				variant='scrollable'
				value={value}
				onChange={handleChange}
				className={classes.tabs}
			>
				{categories.map((category, index) => {
					return <Tab label={category.name} key={index} />
				})}
			</Tabs>
			<Grid container spacing={2}>
				{categories.map((category, index) => {
					return (
						<Grid key={index} item xs={12}>
							<TabPanel value={value} index={index}>
								<Articles
									categoryName={category.name}
									categoryId={category.id}
								/>
							</TabPanel>
						</Grid>
					)
				})}
			</Grid>
		</div>
	)
}

export default Presentation
