import { jwt_decode } from 'jwt-decode';

import { AUTHENTICATION } from '../actions/auth';

export interface AuthenticationState {
  isLoggedIn: boolean = false;
  claims: object;
  jwt: string;
}

export const auth = (state: AuthenticationState = {}, action) => {
  switch (action.type) {
    case AUTHENTICATION.LOGGING_IN:
      return state;

    case AUTHENTICATION.LOGGED_IN:
      const jwt = action.authentication.access_token;
      const claims = jwt_decode(jwt);

      // Save the JWT in the session storage so fetch and use it easily.
      window.sessionStorage.setItem('jwt', jwt);

      return { ...state, claims, jwt, isLoggedIn: true };

    case AUTHENTICATION.LOGGING_IN_HAS_FAILED:
      return state;

    case AUTHENTICATION.LOG_OUT:
      // Remove the JWT from the session.
      window.sessionStorage.removeItem('jwt');

      // Reset the state completely.
      return { isLoggedIn: false };

    default:
      return state;
  }
};
