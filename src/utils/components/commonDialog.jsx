import React from 'react'
import {
	Slide,
	Dialog,
	makeStyles,
	AppBar,
	Toolbar,
	IconButton,
	Paper,
	Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'static',
		background: 'linear-gradient(45deg, #280071 10%, #c42053 90%)',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	layout: {
		padding: theme.spacing(5),
	},
	paper: {
		padding: theme.spacing(2),
	},
}))

export default function CommonDialog(props) {
	const classes = useStyles()
	const { open, handleClose, children, title, maxWidth = 'sm' } = props

	return (
		<Dialog
			disableBackdropClick
			disableEscapeKeyDown
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}
			maxWidth={maxWidth}
		>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						{title}
					</Typography>
					<IconButton
						edge='start'
						color='inherit'
						onClick={handleClose}
						aria-label='close'
					>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<main className={classes.layout}>
				<Paper className={classes.paper}>{children}</Paper>
			</main>
		</Dialog>
	)
}
