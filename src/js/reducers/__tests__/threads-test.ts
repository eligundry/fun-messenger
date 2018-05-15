import { threads, initialState, ThreadState } from '../threads';
import { THREAD, ThreadResponse } from '../../actions/threads';

const threadResponse: ThreadResponse = {
  id: '1b877bbc-4715-4a2c-895f-6690e5064ca4',
  title: 'Test Thread',
  messages: [
    {
      id: '8f62aa2f-6482-4ca8-8a8b-b9075341d362',
      text: 'Test Message',
    },
  ],
};

const threadState: ThreadState = {
  [threadResponse.id]: {
    id: threadResponse.id,
    title: threadResponse.title,
    messages: [threadResponse.messages[0].id],
  },
};

describe('threads reducer', () => {
  it('should return the default state', () => {
    expect(threads(undefined, {})).toEqual(initialState);
  });

  it('should create a new thread', () => {
    expect(threads(undefined, {
      type: THREAD.THREAD_CREATED,
      thread: threadResponse,
    })).toEqual(threadState);
  });

  it('should fetch a single thread', () => {
    expect(threads(undefined, {
      type: THREAD.THREAD_FETCHED,
      thread: threadResponse,
    })).toEqual(threadState);
  })
});
