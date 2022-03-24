import React from 'react'
import {
	Grid,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Button,
} from '@material-ui/core'
import validate from '../../../../utils/functions/validation'

export default function Presentation(props) {
	const { email, setEmail, handleSubmit, open, setOpen } = props
	return (
		<div>
			<Grid container>
				<Grid item xs={12}>
					<span
						style={{ color: '#c42053', fontSize: '14px', fontWeight: 'bold' }}
						onClick={() => setOpen(true)}
						className='c-pointer'
					>
						Forgot Password?
					</span>
					<Dialog open={open} onClose={() => setOpen(false)}>
						<DialogContent>
							<DialogContentText>
								Enter your user account's verified email address and we will
								send you a password reset link.
							</DialogContentText>
							<TextField
								id='auth-forget-password-email'
								label='Email Address'
								type='email'
								fullWidth
								autoFocus
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setOpen(false)} color='primary'>
								Cancel
							</Button>
							<Button
								color='primary'
								disabled={!validate.checkEmail(email)}
								onClick={handleSubmit}
							>
								Ok
							</Button>
						</DialogActions>
					</Dialog>
				</Grid>
			</Grid>
		</div>
	)
}
