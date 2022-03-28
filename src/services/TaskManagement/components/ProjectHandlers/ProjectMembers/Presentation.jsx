import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { Link } from 'react-router-dom'
import MetaInfo from '../../../../../utils/functions/metaInfo'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
	table: {
		width: '100%',
		backgroundColor: '#fafafa',
	},
})

export default function Presentation(props) {
	const classes = useStyles()
	const { assignees, handleLevelChange, handleUpdateLevels, handleRemove } =
		props
	const metaInfo = new MetaInfo()
	return (
		<div>
			<TableContainer component={Paper}>
				<Table
					className={classes.table}
					size='small'
					aria-label='a dense table'
				>
					<TableHead>
						<TableRow>
							<TableCell>Fullname</TableCell>
							<Tooltip title='Create'>
								<TableCell align='center'>C</TableCell>
							</Tooltip>
							<Tooltip title='Update'>
								<TableCell align='center'>U</TableCell>
							</Tooltip>
							<Tooltip title='Read'>
								<TableCell align='center'>R</TableCell>
							</Tooltip>
							<Tooltip title='Delete'>
								<TableCell align='center'>D</TableCell>
							</Tooltip>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{assignees.map((employee) => {
							return (
								<TableRow>
									<TableCell align='left'>
										<Link to={'/console/employees/' + employee.uid}>
											{metaInfo.emailToName(employee.uid)}
										</Link>{' '}
									</TableCell>
									<TableCell align='center'>
										<Checkbox
											checked={employee.create}
											id='tm-access-tables-create'
											onChange={() =>
												handleLevelChange(
													employee.uid,
													employee.create,
													'create'
												)
											}
											color='primary'
											inputProps={{ 'aria-label': ' checkbox' }}
										/>
									</TableCell>
									<TableCell align='center'>
										<Checkbox
											checked={employee.update}
											id='tm-access-tables-update'
											color='primary'
											onChange={() =>
												handleLevelChange(
													employee.uid,
													employee.update,
													'update'
												)
											}
											inputProps={{ 'aria-label': ' checkbox' }}
										/>
									</TableCell>
									<TableCell align='center'>
										<Checkbox
											id='tm-access-tables-read'
											checked={employee.read}
											color='primary'
											onChange={() =>
												handleLevelChange(employee.uid, employee.read, 'read')
											}
											inputProps={{ 'aria-label': ' checkbox' }}
										/>
									</TableCell>
									<TableCell align='center'>
										<Checkbox
											id='tm-access-tables-delete'
											checked={employee.delete}
											color='primary'
											onChange={() =>
												handleLevelChange(
													employee.uid,
													employee.delete,
													'delete'
												)
											}
											inputProps={{ 'aria-label': ' checkbox' }}
										/>
									</TableCell>
									<TableCell className='d-flex justify-content-spacebetween'>
										<Button
											className='bg-blue text-none'
											onClick={() => handleUpdateLevels(employee.uid)}
										>
											Apply permissions
										</Button>
										<Button
											className='bg-red text-none'
											onClick={() => handleRemove(employee.uid)}
										>
											Remove from project
										</Button>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}
