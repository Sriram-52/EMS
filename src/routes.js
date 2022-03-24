// unProtected
import SignIn from './services/Authentication/components/Login'

// protected
import Home from './services/Dashboard/components/Home'
import ProjectList from './services/TaskManagement/components/ProjectList/Index'

export const unProtectedRoutes = [{ path: '/signIn', component: SignIn }]

export const protectedRoutes = [
	{ path: '/', component: Home },
	{ path: '/taskManagement', component: ProjectList },
]
