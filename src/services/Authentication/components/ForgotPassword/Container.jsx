import React, { useState } from 'react'
import Presentation from './Presentation'
import { forgotPassword } from '../../middleware'
import { useDispatch } from 'react-redux'

function Container(props) {
	const [email, setEmail] = useState('')
	const [open, setOpen] = useState(false)

	const dispatch = useDispatch()

	const handleSubmit = (e) => {
		e.preventDefault()
		setOpen(false)
		dispatch(forgotPassword(email))
	}

	return (
		<div>
			<Presentation
				email={email}
				setEmail={setEmail}
				handleSubmit={handleSubmit}
				open={open}
				setOpen={setOpen}
			/>
		</div>
	)
}

export default Container
