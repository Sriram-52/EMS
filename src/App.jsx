import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import './App.css'
import { tokenListner } from './services/Authentication/middleware'
import CustomBackDrop from './utils/components/customBackdrop'
import NavBar from './utils/components/navBar'
import { unProtectedRoutes } from './routes'

function App() {
	const state = useSelector((appState) => appState.auth.signIn)
	const dispatch = useDispatch()

	useEffect(() => {
		tokenListner(dispatch)
	}, [])

	if (state.loading) return <CustomBackDrop open={true} />

	if (!state.data.user) {
		return (
			<BrowserRouter>
				<Switch>
					{unProtectedRoutes.map(({ path, component }, idx) => {
						return <Route key={idx} exact path={path} component={component} />
					})}
					<Redirect from='/' to='/signIn' />
				</Switch>
			</BrowserRouter>
		)
	} else {
		return (
			<BrowserRouter>
				<NavBar />
			</BrowserRouter>
		)
	}
}

export default App
