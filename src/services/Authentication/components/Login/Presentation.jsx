import React, { useState } from 'react'
import {
	Button,
	TextField,
	Paper,
	Grid,
	InputAdornment,
	IconButton,
	makeStyles,
	CssBaseline,
	Box,
	Typography,
} from '@material-ui/core'
import {
	Visibility as VisibilityIcon,
	VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons'
import ForgotPassword from '../ForgotPassword'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	image: {
		background: 'linear-gradient(45deg, #280071 10%, #c42053 90%)',
	},
	logoGradient: {
		width: '100%',
		marginTop: '20%',
		color: '#fff',
		marginLeft: '10px',
		height: '50%',
	},
	logoCopyright: {
		color: '#fff',
		fontSize: '14px',
		textAlign: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	logo: {
		height: '32vh',
		marginRight: '50px',
		marginBottom: '50px',
		width: '20vw',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		color: '#fff',
		background: '#280071',
		'&:hover': {
			background: '#c42053',
		},
	},
}))

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			flairtechno.com {new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

export default function Presentation(props) {
	const { onLogin } = props
	const classes = useStyles()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	return (
		<Grid container component='main' className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image}>
				<img
					// src={configuration.flair_logo}
					alt='Company Logo'
					className={classes.logoGradient}
				/>
				<p className={classes.logoCopyright}>
					{'© '}
					{new Date().getFullYear()}
					{'FLAIR - All rights reserved'}
				</p>
			</Grid>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
				<div className={classes.paper}>
					<div>
						<img
							// src={companyLogo.companyLogo}
							alt='Company Logo'
							className={classes.logo}
						/>
					</div>
					<form
						className={classes.form}
						onSubmit={(e) => {
							e.preventDefault()
							onLogin({ email, password })
						}}
					>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							value={email}
							autoComplete='email'
							autoFocus
							onChange={(event) => setEmail(event.target.value)}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							value={password}
							type={showPassword ? 'text' : 'password'}
							id='password'
							onChange={(event) => setPassword(event.target.value)}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={() => setShowPassword(!showPassword)}
											onMouseDown={(e) => {
												e.preventDefault()
											}}
											edge='end'
										>
											{showPassword ? (
												<VisibilityIcon />
											) : (
												<VisibilityOffIcon />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							className={classes.submit}
						>
							Sign In
						</Button>
						<ForgotPassword />
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	)
}
