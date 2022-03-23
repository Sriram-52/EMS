import { combineReducers } from 'redux'
import authReducer from '../services/Authentication/reducers'
import taskReducer from '../services/TaskManagement/reducers'
import wikiReducer from '../services/Wiki/reducers'
import employeeReducer from '../services/EmployeeManagement/reducers'

const rootReducer = combineReducers({
	auth: authReducer,
	task: taskReducer,
	wiki: wikiReducer,
	employee: employeeReducer,
})

export default rootReducer
