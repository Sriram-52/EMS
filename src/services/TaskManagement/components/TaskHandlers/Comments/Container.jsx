import React, { useEffect, useState } from 'react'
import Presentation from './Presentation'
import {
	newComment,
	updateComment,
	deleteComment,
	getComments,
} from '../../../middleware/TaskHandlers'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../../../utils/components/loader'

export default function Container(props) {
	const { taskId, projectId } = props

	const [state, setState] = useState({
		commentText: '',
		commenting: false,
		isEditing: false,
		updateId: '',
	})

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getComments(projectId, taskId))
	}, [taskId])

	const comments = useSelector((appState) => appState.task.comments)
	const user = useSelector((appState) => appState.auth.signIn.data.user)

	const clearState = () => {
		setState({
			commentText: '',
			commenting: false,
			updateId: '',
			isEditing: false,
		})
	}

	const handleChange = (key, value) => {
		setState((prevState) => {
			return {
				...prevState,
				[key]: value,
			}
		})
	}

	const callback = () => {
		clearState()
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setState({ ...state, commenting: true })
		dispatch(
			newComment({ text: state.commentText }, projectId, taskId, callback)
		)
	}

	const handleUpdate = (e) => {
		e.preventDefault()
		if (state.updateId) {
			setState({ ...state, commenting: true })
			dispatch(
				updateComment(
					{ text: state.commentText },
					projectId,
					taskId,
					state.updateId,
					callback
				)
			)
		}
	}

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this?')) {
			dispatch(deleteComment(projectId, taskId, id, callback))
		}
	}

	if (comments.list.loading) return <Loader />

	return (
		<Presentation
			{...state}
			auth={user}
			comments={Object.values(comments.list.data)}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			handleUpdate={handleUpdate}
			handleDelete={handleDelete}
		/>
	)
}
