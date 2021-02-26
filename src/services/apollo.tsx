import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client'
import firebase from 'firebase'
import { setContext } from '@apollo/client/link/context'
import fetch from 'isomorphic-fetch'

// Storing user object for global access. this is ephimeral storage
// 'loading' default value is used for waiting on observer on page reload
export const firebaseUser = makeVar<firebase.User | null | 'loading'>('loading')

// Change to env variable (for Netlify) or set your own API URI according to env
const apiUri = 'https://api.spacex.land/graphql'

const httpLink = new HttpLink({
  uri: apiUri,
  fetch,
})

const withToken = setContext(async () => {
  // this implementation is opinionated :
  // this will be evaluated on each query
  let token = null
  if (firebaseUser() && firebaseUser() !== 'loading')
    token = await (firebaseUser() as firebase.User).getIdToken()
  return { token }
})

// Sets the header for every GraphQL API call. If a JWT token is present, insert it.
const authLink = new ApolloLink((operation, forward) => {
  const { token } = operation.getContext()
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  })
  return forward(operation)
})

const link = ApolloLink.from([withToken, authLink.concat(httpLink)])

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
