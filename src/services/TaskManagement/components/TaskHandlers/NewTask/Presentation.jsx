import React from 'react'
import { Button, Grid, Tooltip } from '@material-ui/core'
import CommonDialog from '../../../../../utils/components/commonDialog'
import {
	DateInput,
	SelectInput,
	TextInput,
} from '../../../../../utils/components/formFields'

export default function Presentation() {
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleChange = () => {}

	return (
		<div>
			<Tooltip title='New project' aria-label='excel_tooltip'>
				<Button variant='contained' color='primary' onClick={handleClickOpen}>
					add a new project
				</Button>
			</Tooltip>
			<CommonDialog open={open} handleClose={handleClose} title='New Project'>
				<Grid component='form' container spacing={1}>
					<Grid item xs={12} sm={6}>
						<TextInput
							name='name'
							label='Name'
							required={true}
							handleChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<SelectInput
							menuItems={['Task', 'Bug']}
							name='type'
							label='Task type'
							required
							handleChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<DateInput
							label='Start date'
							handleChange={handleChange}
							name='startdate'
							required={true}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<DateInput
							label='End date'
							handleChange={handleChange}
							name='enddate'
							required={true}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<SelectInput
							menuItems={['Open', 'InProgress', 'Review', 'Closed']}
							name='status'
							label='Status'
							required
							handleChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<SelectInput
							menuItems={['Urgent', 'High', 'Medium', 'Low']}
							name='status'
							label='Status'
							required
							handleChange={handleChange}
						/>
					</Grid>
				</Grid>
			</CommonDialog>
		</div>
	)
}
