import { THREAD, ThreadResponse } from '../index';
import * as fetchActions from '../fetch';

describe('fetch a thread', () => {
  test('starts fetching a thread', () => {
    expect(fetchActions.threadFetching(true)).toEqual({
      isLoading: true,
      type: THREAD.THREAD_FETCHING,
    });
  });

  test('finishes fetching a thread', () => {
    expect(fetchActions.threadFetching(false)).toEqual({
      isLoading: false,
      type: THREAD.THREAD_FETCHING,
    });
  });

  test('thread fetching fails gracefully', () => {
    expect(fetchActions.threadFetchingHasFailed('Error')).toEqual({
      errorMessage: 'Error',
      type: THREAD.THREAD_FETCHING_HAS_FAILED,
    });
  });

  // @TODO Test the actual fetching
});
