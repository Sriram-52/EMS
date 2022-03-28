import { combineReducers } from 'redux'
import projectsReducer from './projects'
import projectListReducer from './projectList'
import taskListReducer from './taskList'
import commentsReducer from './comments'
import tasksReducer from './tasks'

export default combineReducers({
	projects: projectsReducer,
	projectList: projectListReducer,
	tasks: tasksReducer,
	taskList: taskListReducer,
	comments: commentsReducer,
})
