import 'firebase/auth'
import firebase from 'firebase/app'

// there should be one firebaseConfig object per environment
// this parameters are obtained from firebase console.
// this assumes one firebase project per environment
const stagingFirebaseConfig = {
  apiKey: 'MySecretAPIKEY',
  authDomain: 'my-project-id-staging.firebaseapp.com',
  projectId: 'my-project-id-staging',
  storageBucket: 'my-project-id-staging.appspot.com',
  messaginSenderId: '9999999999',
  appId: '9:9999999999:web:9a9a9a9a9a9a9a9',
  measurementId: 'G-XLAXLXSLAX',
}
const prodFirebaseConfig = {
  apiKey: 'MySecretAPIKEY',
  authDomain: 'my-project-id-prod.firebaseapp.com',
  projectId: 'my-project-id-prod',
  storageBucket: 'my-project-id-prod.appspot.com',
  messaginSenderId: '9999999999',
  appId: '9:9999999999:web:9a9a9a9a9a9a9a9',
  measurementId: 'G-XLAXLXSLAX',
}

/// window object does not exist on server
const hostname = typeof window !== 'undefined' && window?.location?.hostname

// select correct config for environment
const firebaseConfig =
  hostname === 'prod.myhostname.com'
    ? prodFirebaseConfig
    : stagingFirebaseConfig

let firebaseInstance: firebase.app.App

export const getFirebaseInstance = (): firebase.app.App | null => {
  // check if we are indeed in the browser
  if (typeof window !== 'undefined') {
    // singleton
    if (firebaseInstance) return firebaseInstance
    firebaseInstance = firebase.initializeApp(firebaseConfig)
    return firebaseInstance
  }
  return null
}

export const signInWithEmail: (
  email: string,
  password: string,
  onSignIn: () => void, // this is a callback to execute if login is successful
  onError?: () => void, // optional, if error handling must be defined on calling component
) => void = (email, password, onSignIn) => {
  if (firebaseInstance)
    firebaseInstance
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        onSignIn()
      })
      .catch((error: any) => {
        const errorMessage = error.message
        const errorCode = error.code
        // implement your error handling and user feedback logic here
        // alternatively, onError()
      })
}

export const signOut: (onSignOut: () => void, onError: () => void) => void = (
  onSignOut,
  onError,
) => {
  if (firebaseInstance)
    firebaseInstance
      .auth()
      .signOut()
      .then(() => onSignOut())
      .catch(() => onError())
}
