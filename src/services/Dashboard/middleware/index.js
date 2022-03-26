import { dispatcher } from '../../../utils/functions/dispatcher'
import ACTIONS from '../actions'
import firebase from '../../../utils/firebase'

export const getMetaInfo = () => (dispatch) => {
	dispatch(dispatcher(ACTIONS.META_INFO_REQ))
	const unSubscribe = firebase
		.firestore()
		.collection(`META_INFO`)
		.onSnapshot(
			(querySnapshot) => {
				const metaInfo = {}
				querySnapshot.docs.forEach((doc) => {
					metaInfo[doc.id] = doc.data()
				})
				return dispatch(dispatcher(ACTIONS.META_INFO_SUCCESS, metaInfo))
			},
			(err) => {
				const errMsg = err.message || 'Failed to load metaInfo'
				return dispatch(dispatcher(ACTIONS.META_INFO_FAILURE, errMsg))
			}
		)
}
