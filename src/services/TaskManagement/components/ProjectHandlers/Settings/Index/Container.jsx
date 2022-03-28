import React from 'react'
import Presentation from './Presentation'

export default function Container(props) {
	const { projectId } = props

	return <Presentation projectId={projectId} />
}
