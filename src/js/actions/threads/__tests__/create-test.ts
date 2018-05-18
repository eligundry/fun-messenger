import { THREAD, ThreadResponse } from '../index';
import * as createActions from '../create';

const threadResponse: ThreadResponse = {
  id: '1ed31d8e-8de6-4a40-88f2-0f81e7690a1e',
  title: "This is a test thread!",
  messages: [
    {
      id: '1ed31d8e-8de6-4a40-88f2-0f81e7690a1e',
      text: "Hello world!",
    },
  ],
};

describe('create a thread', () => {
  test('starts creating a thread', () => {
    expect(createActions.threadCreating(true)).toMatchObject({
      isLoading: true,
      type: THREAD.THREAD_CREATING,
    });
  });

  test('finishes creating a thread', () => {
    expect(createActions.threadCreating(false)).toMatchObject({
      isLoading: false,
      type: THREAD.THREAD_CREATING,
    });
  });

  test('tread creation fails gracefully', () => {
    expect(createActions.threadCreatingHasFailed("Error")).toMatchObject({
      errorMessage: "Error",
      type: THREAD.THREAD_CREATING_HAS_FAILED,
    });
  });

  test('thead successfully created', () => {
    expect(createActions.threadCreated(threadResponse)).toMatchObject({
      thread: threadResponse,
      type: THREAD.THREAD_CREATED,
    });
  });

  // @TODO Test the actual fetch
});
