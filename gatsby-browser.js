export { wrapRootElement } from './src/components/containers/RootContainer'
import { getFirebaseInstance } from './src/services/auth'
import { firebaseUser } from './src/services/apollo'
import { storeIdToken } from './src/services/localStorage'

// this is the first method to be execute on page load. handled by gatsby
// this is opinionated:
// here we mount idToken (user) observer
export const onClientEntry = () => {
  const firebaseInstance = getFirebaseInstance()
  firebaseInstance?.auth().onIdTokenChanged(async user => {
    firebaseUser(user)
    let token = null
    if (user) {
      token = await user.getIdToken()
      // this is a good place for user-dependant reactive variable initialization
    }
    // if user === null, then it is not logged,
    // and we erase the stored token by passing null
    storeIdToken(token)
  })
}
