import React from 'react'
import { Router } from '@reach/router'
import { firebaseUser } from '../services/apollo'
import { useReactiveVar } from '@apollo/client'

import PrivateRoute from 'src/components/privateRoute'
import HomeScreen from 'src/screens/home'
import LoginScreen from 'src/screens/login'
import Loading from '../components/loading'

const IndexPage: React.FC = () => {
  // this is opinionated
  // here we wait for the observer to receive the user
  // by using a hook on the reactive var which forces rerender
  // this way, the whole app, except the apollo layer, waits for the user initialization
  const user = useReactiveVar(firebaseUser)
  return user === 'loading' ? (
    // implement loading component
    <Loading />
  ) : (
    <Router>
      <LoginScreen path="login" />
      <PrivateRoute component={HomeScreen} path="/" />
    </Router>
  )
}

export default IndexPage
