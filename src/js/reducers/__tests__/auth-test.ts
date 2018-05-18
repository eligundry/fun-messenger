import { auth, initialState } from '../auth';
import { AUTHENTICATION } from '../../actions/auth';

const payload = {
  // tslint:disable-next-line:max-line-length
  access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjU4MzY3NDMsImlhdCI6MTUyNTgzNjQ0MywiaWRlbnRpdHkiOiIxZWQzMWQ4ZS04ZGU2LTRhNDAtODhmMi0wZjgxZTc2OTBhMWUiLCJuYmYiOjE1MjU4MzY0NDMsInByb2ZpbGUiOnsiZmlyc3RfbmFtZSI6IkVsaSIsImxhc3RfbmFtZSI6Ikd1bmRyeSIsImVtYWlsIjoiZWxpZ3VuZHJ5K3Rlc3QxQGdtYWlsLmNvbSJ9fQ.nZyALDoxhN8i9Oy1RmDH1JsfmIg63P0Q0dK3zOi54oI',
};

describe('auth reducer', () => {
  test('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });

  test('should start logging in', () => {
    expect(auth(undefined, {
      type: AUTHENTICATION.LOGGING_IN,
      isLoading: true,
    })).toEqual({
      isLoading: true,
      isLoggedIn: false,
      error: null,
      claims: {},
      jwt: null,
    });
  });

  test('should finish logging in', () => {
    expect(auth(undefined, {
      type: AUTHENTICATION.LOGGING_IN,
      isLoading: false,
    })).toEqual({
      isLoading: false,
      isLoggedIn: false,
      error: null,
      claims: {},
      jwt: null,
    });
  });

  test('should store the authentication info', () => {
    expect(auth(undefined, {
      type: AUTHENTICATION.LOGGED_IN,
      authentication: payload,
    })).toEqual({
      isLoading: false,
      isLoggedIn: true,
      error: null,
      claims: {
        exp: 1525836743,
        iat: 1525836443,
        identity: '1ed31d8e-8de6-4a40-88f2-0f81e7690a1e',
        nbf: 1525836443,
        profile: {
          first_name: 'Eli',
          last_name: 'Gundry',
          email: 'eligundry+test1@gmail.com',
        },
      },
      jwt: payload.access_token,
    });
  });

  test('should log out', () => {
    expect(auth(undefined, { type: AUTHENTICATION.LOG_OUT })).toEqual(initialState);
  });
});
