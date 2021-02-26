import React, { useEffect } from 'react'
import { RouteComponentProps, useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import { isNil } from 'ramda'
import { firebaseUser } from '../../services/apollo'

type PrivateRouteProps = {
  component: React.ComponentType<RouteComponentProps>
  path: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  component: Component,
}) => {
  // this hook is optional
  // >> const user = useReactiveVar(firebaseUser)
  // since we wait for initialization on parent component and implement a onSignOut callback
  // if no onSignOut callback is implemented,
  // user change can be captured here and implement control flow accordingly.
  const user = firebaseUser()

  const location = useLocation()
  console.log(`current location: ${location.pathname}`)
  // this is a good place to obtain user data (like profile)
  // inside a useEffect
  // conditioning render to data load.
  // if using route based authorization,
  // this is the place for handling control flow logic.

  if (isNil(user)) {
    navigate('/login')
    return null
  }

  return <Component>{children}</Component>
}

export default PrivateRoute
