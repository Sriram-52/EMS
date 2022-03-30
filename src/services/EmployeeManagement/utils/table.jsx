import React from 'react'
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: '100%',
	},
}))

export function RenderProfileInfo({ data }) {
	const classes = useStyles()
	return (
		<TableContainer className={classes.root} component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						{data.map(({ name }, idx) => {
							return (
								<TableCell key={idx} align='left'>
									{name}
								</TableCell>
							)
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						{data.map(({ value }, idx) => {
							return (
								<TableCell key={idx} align='left'>
									{value}
								</TableCell>
							)
						})}
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}
