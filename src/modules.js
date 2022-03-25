import { FaHistory, FaTasks, FaUsers, FaHome } from 'react-icons/fa'
import { TiDocumentText, TiUserAdd } from 'react-icons/ti'

export const modules = [
	{
		text: 'Home',
		Icon: FaHome,
		link: '/',
		moduleName: 'common-module',
	},
	{
		text: 'Task management',
		Icon: FaTasks,
		link: '/console/projects',
		moduleName: 'task-management',
	},
	{
		text: 'Wiki',
		Icon: TiDocumentText,
		link: '/console/wiki',
		moduleName: 'wiki',
	},
	{
		text: 'Invite employee',
		Icon: TiUserAdd,
		link: '/console/inviteemployee',
		moduleName: 'console-customization',
	},
	{
		text: 'Employee list',
		Icon: FaUsers,
		link: '/console/employees',
		moduleName: 'employees-manager',
	},
	{
		text: 'History',
		Icon: FaHistory,
		link: '/console/history',
		moduleName: 'common-module',
	},
]
