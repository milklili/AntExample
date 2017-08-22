import locationHelperBuilder from 'redux-auth-wrapper/history3/locationHelper'
import { connectedReduxRedirect } from 'redux-auth-wrapper/history3/redirect'
import { routerActions } from 'react-router-redux'
import { Loader } from '../components'

const locationHelper = locationHelperBuilder({})

export const userIsAuthenticated = connectedReduxRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => {
    return state.auth !== undefined && state.auth.isAuthenticated
  },
  authenticatingSelector: state => state.auth !== undefined && state.auth.isAuthenticating,
  AuthenticatingComponent: Loader,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',
})

export const userIsNotAuthenticated = connectedReduxRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: state => state.auth !== undefined && !state.auth.isAuthenticating,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsNotAuthenticated',
})
