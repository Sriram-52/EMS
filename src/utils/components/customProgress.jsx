import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core'

const useStylesFacebook = makeStyles({
	root: {
		position: 'relative',
		marginTop: '4px',
		marginRight: '3px',
	},
	top: {
		color: '#eef3fd',
	},
	bottom: {
		color: '#6798e5',
		animationDuration: '550ms',
		position: 'absolute',
		left: 0,
	},
	reverseImage: {
		WebkitTransform: 'scaleX(-1)',
		transform: 'scaleX(-1)',
	},
})

function CustomProgress(props) {
	const classes = useStylesFacebook()

	return (
		<div className={classes.root}>
			<CircularProgress
				variant='determinate'
				value={100}
				className={classes.top}
				size={15}
				thickness={4}
				{...props}
			/>
			<CircularProgress
				variant='indeterminate'
				disableShrink
				className={classes.bottom}
				size={15}
				thickness={4}
				{...props}
			/>
		</div>
	)
}

export default CustomProgress
