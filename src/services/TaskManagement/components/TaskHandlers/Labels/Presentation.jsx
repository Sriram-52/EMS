import React from 'react'

export default function Presentation(props) {
	const { task, project } = props
	return (
		<div>
			{task.labels.map((id) => {
				const label = project.labels[id]
				return (
					<div
						className='p-2 rounded'
						style={{ backgroundColor: `${label.colorCode}` }}
					>
						{label.name}
					</div>
				)
			})}
		</div>
	)
}
