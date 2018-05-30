import { AUTHENTICATION } from '../index';
import * as actions from '../signUp';

const faker = require('faker');

describe('sign the user up', () => {
  test('starts signing the user up', () => {
    expect(actions.signingUp(true)).toEqual({
      isLoading: true,
      type: AUTHENTICATION.SIGNING_UP,
    });
  });

  test('finishes signing the user up', () => {
    expect(actions.signingUp(false)).toEqual({
      isLoading: false,
      type: AUTHENTICATION.SIGNING_UP,
    });
  });

  test('signing up errors out gracefully', () => {
    expect(actions.signingUpHasFailed('Error')).toEqual({
      errorMessage: 'Error',
      type: AUTHENTICATION.SIGNING_UP_HAS_FAILED,
    });
  });

  test('signing up succeeds', () => {
    const user = {
      first_name: faker.name.firstName,
      last_name: faker.name.lastName,
      email: faker.internet.email,
      password: faker.internet.password,
    };

    expect(actions.signedUp(user)).toEqual({
      user: user,
      type: AUTHENTICATION.SIGNED_UP,
    });
  });
});
