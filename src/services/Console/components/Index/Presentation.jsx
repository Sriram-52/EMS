import React from 'react'
import { Header, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { FaHistory, FaTasks, FaUsers } from 'react-icons/fa'
import { MdViewModule } from 'react-icons/md'
import { Business } from '@material-ui/icons'
import { TiDocumentText } from 'react-icons/ti'

const CustomCard = ({ title, service }) => {
	return (
		<React.Fragment>
			<Header>{title}:</Header>
			<hr />
			<Card.Group itemsPerRow={4} className='ml-4 mt-1'>
				{service.map((item) => {
					return (
						<span className='m-1'>
							<Link className='m-1' style={{ color: 'grey' }} to={item.linkTo}>
								<Card
									className='w-100 p-4'
									color={item.color}
									image={item.icon}
								/>
							</Link>
							<br />
							<span className='font-10'>{item.text}</span>
						</span>
					)
				})}
			</Card.Group>
		</React.Fragment>
	)
}

function Presentation() {
	return (
		<div className='ml-3 mr-3 mt-3'>
			<CustomCard title='Frequently used' service={frequentServices} />
			<CustomCard title='Rarely Used' service={rareServices} />
		</div>
	)
}

export default Presentation

const frequentServices = [
	{
		text: 'Task management',
		icon: <FaTasks style={{ fontSize: '50px' }} />,
		linkTo: 'console/projects',
		color: 'blue',
	},
	{
		text: 'Wiki',
		icon: <TiDocumentText style={{ fontSize: '50px' }} />,
		linkTo: 'console/wiki',
		color: 'red',
	},
	{
		text: 'Employee List',
		icon: <FaUsers style={{ fontSize: '50px' }} />,
		linkTo: 'console/employees',
		color: 'violet',
	},
	{
		text: 'History',
		icon: <FaHistory style={{ fontSize: '50px' }} />,
		linkTo: 'console/history',
		color: 'blue',
	},
]
const rareServices = [
	{
		text: 'Company details',
		icon: <Business style={{ fontSize: '50px' }} />,
		linkTo: 'console/companydetails',
		color: 'blue',
	},
	{
		text: 'Module access',
		icon: <MdViewModule style={{ fontSize: '50px' }} />,
		linkTo: 'console/moduleaccess',
		color: 'red',
	},
]
