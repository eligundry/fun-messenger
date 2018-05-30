import { AUTHENTICATION, SignUpPayload, UserResponse } from './index';
import { ErrorAction, LoadingAction } from '../index';
import fetch from '../../utils/fetch';

export interface SignedUpAction {
  user: UserResponse;
  type: AUTHENTICATION.SIGNED_UP;
}

export const signingUp = (isLoading: boolean): LoadingAction => ({
  isLoading,
  type: AUTHENTICATION.SIGNING_UP,
});

export const signedUp = (user: UserResponse): SignedUpAction => ({
  user,
  type: AUTHENTICATION.SIGNED_UP,
});

export const signingUpHasFailed = (errorMessage: string): ErrorAction => ({
  errorMessage,
  type: AUTHENTICATION.SIGNING_UP_HAS_FAILED,
});

export const signUp = (payload: SignUpPayload) => {
  return (dispatch) => {
    dispatch(signingUp(true));

    return fetch('/api/users/sign-up', {
      method: 'POST',
      body: payload,
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }

        dispatch(loggingIn(false));

        return response;
      })
      .then(response => response.json())
      .then((user: UserResponse) => dispatch(signedUp(user)))
      .catch(response => {
        return response.json().then(err => dispatch(loggingInHasFailed(err.description)));
      });
  }
};
