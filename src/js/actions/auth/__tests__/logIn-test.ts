import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as logIn from '../logIn';
import { AUTHENTICATION } from '../index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const payload = {
  access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjU4MzY3NDMsImlhdCI6MTUyNTgzNjQ0MywiaWRlbnRpdHkiOiIxZWQzMWQ4ZS04ZGU2LTRhNDAtODhmMi0wZjgxZTc2OTBhMWUiLCJuYmYiOjE1MjU4MzY0NDMsInByb2ZpbGUiOnsiZmlyc3RfbmFtZSI6IkVsaSIsImxhc3RfbmFtZSI6Ikd1bmRyeSIsImVtYWlsIjoiZWxpZ3VuZHJ5K3Rlc3QxQGdtYWlsLmNvbSJ9fQ.nZyALDoxhN8i9Oy1RmDH1JsfmIg63P0Q0dK3zOi54oI",
};

describe('log the user in', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  test('starts logging the user in', () => {
    expect(logIn.loggingIn(true)).toMatchObject({
      isLoading: true,
      type: AUTHENTICATION.LOGGING_IN,
    });
  });

  test('finishes logging the user in', () => {
    expect(logIn.loggingIn(false)).toMatchObject({
      isLoading: false,
      type: AUTHENTICATION.LOGGING_IN,
    });
  });

  test('login has succeeded', () => {
    expect(logIn.loggedIn(payload)).toMatchObject({
      authentication: payload,
      type: AUTHENTICATION.LOGGED_IN,
    });
  });

  test('logging in fails gracefully', () => {
    expect(logIn.loggingInHasFailed("Unauthorized")).toMatchObject({
      errorMessage: "Unauthorized",
      type: AUTHENTICATION.LOGGING_IN_HAS_FAILED,
    });
  });

  test('logging out succeeds', () => {
    expect(logIn.logOut()).toMatchObject({
      type: AUTHENTICATION.LOG_OUT,
    });
  })

  test('sending login request succeeds', () => {
    const email = 'bob@example.com';
    const password = 'password';
    const store = mockStore({ authentication: {} });
    const expectedActions = [
      { type: AUTHENTICATION.LOGGING_IN, isLoading: true },
      { type: AUTHENTICATION.LOGGING_IN, isLoading: false },
      { type: AUTHENTICATION.LOGGED_IN, authentication: payload },
    ];

    fetchMock.postOnce('/api/auth', {
      body: payload,
      headers: {
        'content-type': 'application/json',
      },
    });

    return store.dispatch(logIn.sendLoginData('bob@example.com', 'password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
