import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
import 'semantic-ui-css/semantic.min.css'
import 'suneditor/dist/css/suneditor.min.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
