const faker = require('faker');

import { MESSAGE, MessageResponse } from '../index';
import * as actions from '../send';

describe('send a message', () => {
  test('start sending a message', () => {
    expect(actions.messageSending(true)).toEqual({
      isLoading: true,
      type: MESSAGE.MESSAGE_SENDING,
    });
  });

  test('finish sending a message', () => {
    expect(actions.messageSending(false)).toEqual({
      isLoading: false,
      type: MESSAGE.MESSAGE_SENDING,
    });
  });

  test('sent message response is recieved', () => {
    const messageResponse: MessageResponse = {
      id: faker.random.uuid(),
      text: faker.lorem.text(),
    };

    expect(actions.messageSent(messageResponse)).toEqual({
      message: messageResponse,
      type: MESSAGE.MESSAGE_SENT,
    });
  });

  test('message sending fails gracefully', () => {
    expect(actions.messageSendingHasFailed('Error')).toEqual({
      errorMessage: 'Error',
      type: MESSAGE.MESSAGE_SENDING_HAS_FAILED,
    });
  });

  // @TODO Test the actual send action.
});
