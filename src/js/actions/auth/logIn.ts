import { AUTHENTICATION, AuthenticationResponse } from './index';

export const loggingIn = (isLoading: boolean) => ({
  isLoading,
  type: AUTHENTICATION.LOGGING_IN,
});

export const loggedIn = (authentication: AuthenticationResponse) => ({
  authentication,
  type: AUTHENTICATION.LOGGED_IN,
});

export const loggingInHasFailed = (errorMessage: string) => ({
  errorMessage,
  type: AUTHENTICATION.LOGGING_IN_HAS_FAILED,
});

export const logOut = () => ({
  type: AUTHENTICATION.LOG_OUT,
});

export const sendLoginData = (email: string, password: string) => {
  return (dispatch) => {
    dispatch(loggingIn(true));

    return fetch('/api/auth', {
      method: 'POST',
      body: { email, password },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(loggingIn(false));

        return response;
      })
      .then(response => response.json())
      .then(authentication => dispatch(loggedIn(authentication)))
      .catch(err => dispatch(loggingInHasFailed(err.message)));
  };
};
