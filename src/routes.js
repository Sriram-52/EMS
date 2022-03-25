// unProtected
import SignIn from './services/Authentication/components/Login'
import EmployeeRegistration from './services/EmployeeManagement/components/Registration/Index'

// protected
import Home from './services/Dashboard/components/Home'
import ProjectList from './services/TaskManagement/components/ProjectList/Index'
import EmployeeList from './services/EmployeeManagement/components/EmployeeList/Index'

export const unProtectedRoutes = [
	{ path: '/signIn', component: SignIn },
	{ path: '/invitations/:token', component: EmployeeRegistration },
]

export const protectedRoutes = [
	{ path: '/', component: Home },
	{ path: '/console/projects', component: ProjectList },
	{ path: '/console/employees', component: EmployeeList },
]
