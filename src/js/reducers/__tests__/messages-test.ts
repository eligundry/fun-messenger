const faker = require('faker');

import { MESSAGE, MessageResponse } from '../../actions/messages';
import { messages, MessageState, initialState } from '../messages';

const createMessageResponse = (): MessageResponse => {
  return {
    id: faker.random.uuid(),
    text: faker.lorem.lines(),
  };
};

const transformResponseToState = (response): MessageState => {
  if (response instanceof Array) {

  }

  return { [response.id]: response };
};

describe('messages reducer', () => {
  it('should return the default state', () => {
    expect(messages(undefined, {})).toBe(initialState);
  });

  it('should send messages', () => {
    const messageResponse: MessageResponse = createMessageResponse();
    const action = {
      type: MESSAGE.MESSAGE_SENT,
      message: messageResponse,
    };

    expect(messages(undefined, action)).toEqual(transformResponseToState(messageResponse));
  });
});
