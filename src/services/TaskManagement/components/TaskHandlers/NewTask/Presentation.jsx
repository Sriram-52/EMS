import React from 'react'
import { Button, Grid, TextField, Tooltip } from '@material-ui/core'
import CommonDialog from '../../../../../utils/components/commonDialog'
import {
	CheckBoxInput,
	CustomButton,
	DateInput,
	SelectInput,
	TextInput,
} from '../../../../../utils/components/formFields'
import MetaInfo from '../../../../../utils/functions/metaInfo'
import SunEditor from 'suneditor-react'
import { Autocomplete } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	color: {
		width: 14,
		height: 14,
		flexShrink: 0,
		borderRadius: 3,
		marginRight: 8,
		marginTop: 2,
	},
}))

export default function Presentation(props) {
	const {
		handleChange,
		handleSubmit,
		state,
		open,
		handleClickOpen,
		handleClose,
		project,
		isEdit,
	} = props

	const classes = useStyles()

	const metaInfo = new MetaInfo()
	const labels = Object.values(project.labels).filter((e) => e.isExist)

	const title = isEdit ? 'Update Task' : 'New Task'

	return (
		<div>
			<Tooltip title={title} aria-label='excel_tooltip'>
				<Button variant='contained' color='secondary' onClick={handleClickOpen}>
					{title}
				</Button>
			</Tooltip>
			<CommonDialog open={open} handleClose={handleClose} title={title}>
				<Grid component='form' onSubmit={handleSubmit} container spacing={1}>
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
						<SelectInput
							menuItems={['Task', 'Bug']}
							name='type'
							label='Task type'
							required
							handleChange={handleChange}
							value={state.type}
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
							menuItems={['Open', 'InProgress', 'Review', 'Closed']}
							name='status'
							label='Status'
							required
							handleChange={handleChange}
							value={state.status}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<SelectInput
							menuItems={['Urgent', 'High', 'Medium', 'Low']}
							name='priority'
							label='Priority'
							required
							handleChange={handleChange}
							value={state.priority}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Autocomplete
							multiple={true}
							filterSelectedOptions
							options={state.projectAssignees}
							getOptionLabel={(option) => metaInfo.emailToName(option)}
							value={state.assignee}
							onChange={(e, v) =>
								handleChange({ target: { value: v, name: 'assignee' } })
							}
							renderInput={(params) => {
								return (
									<TextField
										{...params}
										label='Add Employees'
										size='small'
										fullWidth
									/>
								)
							}}
						/>
					</Grid>
					{project.useLabels ? (
						<Grid item xs={12}>
							<Autocomplete
								multiple
								filterSelectedOptions
								id='tm-new-task-labels'
								value={state.labels.map((id) =>
									labels.find((label) => label.id === id)
								)}
								options={labels}
								getOptionLabel={(option) => option.name}
								renderOption={(option) => (
									<React.Fragment>
										<span
											className={classes.color}
											style={{ backgroundColor: option.colorCode }}
										/>
										<div className={classes.text}>{option.name}</div>
									</React.Fragment>
								)}
								onChange={(e, v) =>
									handleChange({
										target: { value: v.map((item) => item.id), name: 'labels' },
									})
								}
								renderInput={(params) => (
									<TextField fullWidth {...params} label='Labels' />
								)}
							/>
						</Grid>
					) : null}
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<CheckBoxInput
									label='Set reminder'
									handleChange={handleChange}
									name='setReminder'
									value={state.setReminder}
								/>
							</Grid>
							{state.setReminder ? (
								<Grid item xs={6}>
									<DateInput
										name='reminderDate'
										handleChange={handleChange}
										label='Reminder date'
										required={true}
										value={state.reminderDate}
									/>
								</Grid>
							) : null}
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<SunEditor
							placeholder='Description'
							onChange={(data) =>
								handleChange({
									target: { name: 'description', value: data },
								})
							}
							setOptions={{
								buttonList: [
									[
										'undo',
										'redo',
										'formatBlock',
										'bold',
										'underline',
										'italic',
										'strike',
										'subscript',
										'superscript',
										'fontColor',
										'hiliteColor',
										'removeFormat',
										'outdent',
										'indent',
										'align',
										'horizontalRule',
										'list',
										'lineHeight',
										'table',
										'link',
									],
								],
								mode: 'Balloon-always',
							}}
						/>
					</Grid>
					<Grid item xs={12} className='mt-2'>
						<CustomButton
							type='submit'
							btnText={isEdit ? 'Update' : 'Create'}
							color={isEdit ? 'secondary' : 'primary'}
						/>
					</Grid>
				</Grid>
			</CommonDialog>
		</div>
	)
}
