import React from 'react'
import { Card, CardContent, Grid, makeStyles } from '@material-ui/core'
import { GoFileSymlinkFile } from 'react-icons/go'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))

export default function Attachments(props) {
	const { attachments = [] } = props
	const classes = useStyles()
	return (
		<Card className={classes.root}>
			<CardContent>
				<Grid container>
					<h2>Attachments:</h2>
					{attachments.map((doc, index) => (
						<Grid item xs={12} key={index}>
							<a target='_blank' rel='noopener noreferrer' href={doc.url}>
								<GoFileSymlinkFile size={22} /> {doc.name}
							</a>
						</Grid>
					))}
				</Grid>
			</CardContent>
		</Card>
	)
}
