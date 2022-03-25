import React, { useState } from 'react'
import Presentation from './Presentation'
import validate from '../../../../../utils/functions/validation'
import calenderFormatter from '../../../../../utils/formatters/calenderFormatter'
import { useDispatch } from 'react-redux'
import { inviteEmployee } from '../../../middleware'

export default function Container(props) {
	const { heading, btnText, text } = props

	const initialState = {
		firstName: '',
		lastName: '',
		phoneNumber: '',
		email: '',
		dob: '',
		branch: '',
	}

	const [state, setState] = useState(initialState)
	const [open, setOpen] = useState(false)

	const dispatch = useDispatch()

	const handleClickOpen = () => {
		setOpen(true)
	}

	const onInvite = () => {
		const payload = {
			email: state.email,
			personal: state,
		}
		dispatch(inviteEmployee(payload, handleClose))
	}

	const handleClose = () => {
		setOpen(false)
		setState(initialState)
	}

	const handleChange = (e) => {
		const key = e.target.name
		const value = e.target.value
		if (key === 'email')
			setState({
				...state,
				[key]: value.toLowerCase(),
			})
		else if (key === 'branch')
			setState({
				...state,
				[key]: value,
			})
		else if (key !== 'dob')
			setState({
				...state,
				[key]: validate.nameFormatterToUpperCase(value),
			})
	}

	const handleDateChange = (key, value) => {
		if (!isNaN(Date.parse(value)))
			setState({
				...state,
				[key]: calenderFormatter.standardDateFormat(value),
			})
	}

	return (
		<div>
			<Presentation
				{...state}
				heading={heading}
				btnText={btnText}
				text={text}
				handleChange={handleChange}
				handleDateChange={handleDateChange}
				handleClickOpen={handleClickOpen}
				onInvite={onInvite}
				handleClose={handleClose}
				open={open}
			/>
		</div>
	)
}
