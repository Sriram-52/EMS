import React from 'react'
import {
	Grid,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core'
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { branchList } from '../../../utils/lists'
import { CustomField } from '../../../../../utils/components/formFields'

function Presentation(props) {
	const {
		heading,
		text,
		btnText,
		firstName,
		lastName,
		branch,
		dob,
		email,
		phoneNumber,
		handleChange,
		handleDateChange,
		handleClose,
		handleClickOpen,
		onInvite,
		open,
	} = props

	return (
		<div>
			<Button
				variant='contained'
				color='primary'
				onClick={handleClickOpen}
				id='em-invite-dialog-button'
			>
				{btnText}
			</Button>
			<Dialog
				scroll='paper'
				fullWidth
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle id='form-dialog-title'>
					<span>{heading}</span>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<div>
							<span>{text}</span>
						</div>
					</DialogContentText>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<CustomField
								label='First name'
								type='name'
								name='firstName'
								value={firstName}
								variant='outlined'
								fullWidth
								handleChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomField
								label='Last name'
								type='name'
								name='lastName'
								value={lastName}
								variant='outlined'
								fullWidth
								handleChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomField
								label='Phone'
								type='phone'
								name='phoneNumber'
								value={phoneNumber}
								variant='outlined'
								fullWidth
								handleChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									style={{ marginTop: '4px' }}
									fullWidth
									label='Date of birth'
									format='MM/dd/yyyy'
									name='dob'
									invalidDateMessage=''
									disableFuture={true}
									onChange={(date) => handleDateChange('dob', date)}
									value={dob ? dob : null}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
									id='em-invite-dialog-dob'
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomField
								label='Email Address'
								value={email}
								required
								name='email'
								type='email'
								variant='outlined'
								fullWidth
								handleChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomField
								label='Branch'
								name='branch'
								type='select'
								value={branch}
								menuItems={branchList}
								variant='outlined'
								fullWidth
								handleChange={handleChange}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button onClick={onInvite} color='primary'>
						Invite
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default Presentation
