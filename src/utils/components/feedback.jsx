import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
	return <MuiAlert severity='' elevation={6} variant='filled' {...props} />
}

/*
  severity: info | success | error | warning
*/
export const ErrorFeedback = ({ msg, severity }) => {
	return (
		<Alert className='text-center' variant='filled' severity={severity}>
			{msg}
		</Alert>
	)
}
