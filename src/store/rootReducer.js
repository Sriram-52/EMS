import { combineReducers } from 'redux'
import authReducer from '../services/Authentication/reducers'
import taskReducer from '../services/TaskManagement/reducers'
import wikiReducer from '../services/Wiki/reducers'
import employeeReducer from '../services/EmployeeManagement/reducers'
import ACTIONS from '../services/Authentication/actions'

const appReducer = combineReducers({
	auth: authReducer,
	task: taskReducer,
	wiki: wikiReducer,
	employee: employeeReducer,
})

const rootReducer = (state, action) => {
	if (action.type === ACTIONS.SIGN_OUT_SUCCESS) {
		return undefined
	}
	return appReducer(state, action)
}

export default rootReducer