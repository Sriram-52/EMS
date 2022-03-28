import React from 'react'
import TaskTabs from '../Tabs'
import Settings from '../../ProjectHandlers/Settings/Index'

export default function Presentation(props) {
	const { projectId, modules } = props

	const settingsCondition = () => {
		return (
			modules.includes('task-management-manager') ||
			modules.includes('console-customization')
		)
	}

	return (
		<React.Fragment>
			{settingsCondition() ? (
				<div className='text-right mb-2'>
					<Settings projectId={projectId} />
				</div>
			) : null}
			<TaskTabs projectId={projectId} />
		</React.Fragment>
	)
}
