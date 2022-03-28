import { combineReducers } from 'redux'
import projectsReducer from './projects'
import projectListReducer from './projectList'
import taskListReducer from './taskList'

export default combineReducers({
	projects: projectsReducer,
	projectList: projectListReducer,
	taskList: taskListReducer,
})
