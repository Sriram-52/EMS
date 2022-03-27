import React from 'react'
import Alert from '@material-ui/lab/Alert'

function UnAuthorized(props) {
	return (
		<div>
			<Alert className='text-center' variant='filled' severity='error'>
				You are unauthorized to view this content
			</Alert>
		</div>
	)
}

export default UnAuthorized
