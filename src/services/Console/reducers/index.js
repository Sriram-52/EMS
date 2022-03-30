import { combineReducers } from 'redux'
import { companyDetailsReducer } from './companyDetailsReducer'
import modulesReducer from './modulesReducer'

const rootReducer = combineReducers({
	companyDetails: companyDetailsReducer,
	moduleLevelAccess: modulesReducer,
})

export default rootReducer
