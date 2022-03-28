import React from 'react'
import Presentation from './Presentation'
import validation from '../../../../../utils/functions/validation'
import { useHistory } from 'react-router-dom'

export default function Container(props) {
	const { projectId } = props
	const tab = Number(validation.getQueryParameter('tab')) || 0
	const [tabValue, setTabValue] = React.useState(tab)

	const history = useHistory()

	const handleTabChange = (event, newValue) => {
		const pathName = window.location.pathname
		history.push(`${pathName}?tab=${newValue}`)
		setTabValue(newValue)
	}

	return (
		<Presentation
			projectId={projectId}
			tabValue={tabValue}
			handleTabChange={handleTabChange}
		/>
	)
}
