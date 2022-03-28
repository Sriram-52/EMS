import React from 'react'
import ProjectTabs from '../Tabs'
import NewProject from '../../ProjectHandlers/NewProject'

export default function Presentation() {
	return (
		<div>
			<div className='mb-2'>
				<NewProject />
			</div>
			<ProjectTabs />
		</div>
	)
}
