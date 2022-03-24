import React from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '../../middleware'
import Presentation from './Presentation'

function Container(props) {
	const dispatch = useDispatch()

	const onLogin = (creds) => {
		dispatch(signIn(creds))
	}

	return (
		<div>
			<Presentation onLogin={onLogin} />
		</div>
	)
}

export default Container
