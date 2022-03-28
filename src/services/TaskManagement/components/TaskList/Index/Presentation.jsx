import React from 'react'
import TaskTabs from '../Tabs'
import Settings from '../../ProjectHandlers/Settings/Index'
import NewTask from '../../TaskHandlers/NewTask'

export default function Presentation(props) {
	const { projectId, modules } = props

	const settingsCondition = () => {
		return (
			modules.includes('task-management-manager') ||
			modules.includes('console-customization')
		)
	}

	return (
		<div>
			<div className='d-flex justify-content-between'>
				<div>
					<NewTask projectId={projectId} />
				</div>
				<div>
					{settingsCondition() ? (
						<div className='text-right mb-2'>
							<Settings projectId={projectId} />
						</div>
					) : null}
				</div>
			</div>
			<TaskTabs projectId={projectId} />
		</div>
	)
}
