import React from 'react'
import { Button, Grid, Tooltip } from '@material-ui/core'
import CommonDialog from '../../../../../utils/components/commonDialog'
import {
	DateInput,
	SelectInput,
	TextInput,
	CheckBoxInput,
	CustomButton,
} from '../../../../../utils/components/formFields'
import ActiveMembers from '../../ActiveMembers'

export default function Presentation(props) {
	const {
		handleChange,
		handleSubmit,
		state,
		open,
		handleClickOpen,
		handleClose,
	} = props

	return (
		<div>
			<Tooltip title='New project' aria-label='excel_tooltip'>
				<Button variant='contained' color='primary' onClick={handleClickOpen}>
					add a new project
				</Button>
			</Tooltip>
			<CommonDialog open={open} handleClose={handleClose} title='New Project'>
				<Grid component='form' onSubmit={handleSubmit} container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextInput
							name='name'
							label='Name'
							required={true}
							handleChange={handleChange}
							value={state.name}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextInput
							name='projectId'
							label='Project ID'
							required
							handleChange={handleChange}
							value={state.projectId}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<DateInput
							label='Start date'
							handleChange={handleChange}
							name='startdate'
							required={true}
							value={state.startdate}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<DateInput
							label='End date'
							handleChange={handleChange}
							name='enddate'
							required={true}
							value={state.enddate}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<SelectInput
							menuItems={['Open', 'Closed']}
							name='status'
							label='Status'
							required
							handleChange={handleChange}
							value={state.status}
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<CheckBoxInput
							name='useLabels'
							label='Labels'
							handleChange={handleChange}
							value={state.useLabels}
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<CheckBoxInput
							name='useTimeline'
							label='Timeline'
							handleChange={handleChange}
							value={state.useTimeline}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<ActiveMembers name='employees' onChange={handleChange} />
					</Grid>
					<Grid item xs={12}>
						<CustomButton btnText='Create' type='submit' />
					</Grid>
				</Grid>
			</CommonDialog>
		</div>
	)
}
