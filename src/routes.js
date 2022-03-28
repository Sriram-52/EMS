/// unProtected
import SignIn from './services/Authentication/components/Login'
import EmployeeRegistration from './services/EmployeeManagement/components/Registration/Index'

/// protected
import HomePage from './services/Dashboard/components/Home'

// taskManagement
import ProjectListPage from './services/TaskManagement/components/ProjectList/Index'
import TaskListPage from './services/TaskManagement/components/TaskList/Index'

// employeeManagement
import EmployeeListPage from './services/EmployeeManagement/components/EmployeeList/Index'

// wikiManagement
import WikiHomePage from './services/Wiki/components/Index'
import MoreArticlesPage from './services/Wiki/components/MoreArticles/Index'
import NewArticlePage from './services/Wiki/pages/NewArticlePage'
import EditArticlePage from './services/Wiki/pages/EditArtilcePage'
import WikiSettingsPage from './services/Wiki/components/WikiSettings'
import ViewArticlePage from './services/Wiki/pages/ViewArticlePage'
import ArticleHistoryPage from './services/Wiki/pages/ArticleHistoryPage'
import ViewArticleHistoryPage from './services/Wiki/pages/ViewArticleHistoryPage'
import ViewTaskPage from './services/TaskManagement/components/TaskHandlers/ViewTask'

export const unProtectedRoutes = [
	{ path: '/signIn', component: SignIn },
	{ path: '/invitations/:token', component: EmployeeRegistration },
]

export const protectedRoutes = [
	{
		path: '/console/wiki',
		component: WikiHomePage,
		moduleName: 'wiki',
	},
	{
		path: '/console/wiki/:search/create',
		component: NewArticlePage,
		moduleName: 'wiki',
	},
	{
		path: '/console/wiki/morearticles',
		component: MoreArticlesPage,
		moduleName: 'wiki',
	},
	{
		path: '/console/wiki/settings',
		component: WikiSettingsPage,
		moduleName: 'wiki',
	},
	{
		path: '/console/wiki/:articleId/history',
		component: ArticleHistoryPage,
		moduleName: 'wiki',
	},
	{
		path: '/console/wiki/:articleId',
		component: ViewArticlePage,
		moduleName: 'wiki',
	},
	{
		path: '/console/wiki/:articleId/edit',
		component: EditArticlePage,
		moduleName: 'wiki',
	},
	{
		path: '/console/wiki/:articleId/:historyId',
		component: ViewArticleHistoryPage,
		moduleName: 'wiki',
	},
	{
		path: '/console/projects',
		component: ProjectListPage,
		moduleName: 'task-management',
	},
	{
		path: '/console/projects/:projectId/tasks',
		component: TaskListPage,
		moduleName: 'task-management',
	},
	{
		path: '/console/projects/:projectId/tasks/:taskId',
		component: ViewTaskPage,
		moduleName: 'task-management',
	},
	{
		path: '/console/employees',
		component: EmployeeListPage,
		moduleName: 'employees-manager',
	},
	{
		path: '/',
		component: HomePage,
		moduleName: 'common-module',
	},
]
