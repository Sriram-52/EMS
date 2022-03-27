import { combineReducers } from 'redux'
import articleReducer from './articles'
import categoryReducer from './category'
import commentReducer from './comments'
import historyReducer from './history'

export default combineReducers({
	articles: articleReducer,
	categories: categoryReducer,
	comments: commentReducer,
	history: historyReducer,
})
