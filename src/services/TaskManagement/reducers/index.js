import { combineReducers } from 'redux'
import projectReducer from './projects'

export default combineReducers({
	projects: projectReducer,
})
