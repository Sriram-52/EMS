import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCk7L_SxXL_9H2Y81Izmw9lNSVtUUR20fk',
	authDomain: 'ems-ats.firebaseapp.com',
	projectId: 'ems-ats',
	storageBucket: 'ems-ats.appspot.com',
	messagingSenderId: '355642456208',
	appId: '1:355642456208:web:287a911c3c5184333a4015',
	measurementId: 'G-B7EN8ZWKWX',
}

const app = firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, app as default }
