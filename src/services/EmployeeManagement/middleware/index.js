import ACTIONS from '../actions'
import { dispatcher } from '../../../utils/functions/dispatcher'
import HttpService from '../../../utils/http'

export const getEmployeeModules = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.EMPLOYEE_MODULES_REQ))
	return HttpService.getRequest({ url: '/employee/modules' })
		.then((res) => {
			return dispatch(dispatcher(ACTIONS.EMPLOYEE_MODULES_SUCCESS, res))
		})
		.catch((err) => {
			const errMsg = err.message || 'Failed to load modules'
			return dispatch(dispatcher(ACTIONS.EMPLOYEE_MODULES_FAILURE, errMsg))
		})
}
