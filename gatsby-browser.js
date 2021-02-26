export { wrapRootElement } from './src/components/containers/RootContainer'
import { getFirebaseInstance } from './src/services/auth'
import { firebaseUser } from './src/services/apollo'
import { storeIdToken } from './src/services/localStorage'

// this is the first method to be execute on page load. handled by gatsby
// this is opinionated:
// here we mount idToken (user) observer
// firebaseUser reactive var is used for waiting on user initialization
export const onClientEntry = () => {
  const firebaseInstance = getFirebaseInstance()
  firebaseInstance?.auth().onIdTokenChanged(async user => {
    firebaseUser(user)
    if (user) {
      console.log(`firebase user: ${user}`)
      // this is a good place for user-dependant reactive variable initialization
    }
  })
}
