import { jwt_decode } from 'jwt-decode';

import { AUTHENTICATION } from '../actions/auth';

export interface AuthenticationState {
  isLoading: boolean = false;
  isLoggedIn: boolean = false;
  error: string|null;
  claims: object;
  jwt: string|null;
}

export const initialState: AuthenticationState = {
  isLoading: false,
  isLoggedIn: false,
  error: null,
  claims: {},
  jwt: null,
};

export const auth = (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case AUTHENTICATION.LOGGING_IN:
      return { ...state, isLoading: action.isLoading };

    case AUTHENTICATION.LOGGED_IN:
      const jwt = action.authentication.access_token;
      const claims = jwt_decode(jwt);

      // Save the JWT in the session storage so fetch and use it easily.
      window.sessionStorage.setItem('jwt', jwt);

      return { ...state, claims, jwt, isLoggedIn: true, error: null };

    case AUTHENTICATION.LOGGING_IN_HAS_FAILED:
      return { ...state, error: action.errorMessage };

    case AUTHENTICATION.LOG_OUT:
      // Remove the JWT from the session.
      window.sessionStorage.removeItem('jwt');

      // Reset the state completely.
      return initialState;

    default:
      return state;
  }
};
