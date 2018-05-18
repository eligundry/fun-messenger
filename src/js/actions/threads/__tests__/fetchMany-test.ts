import { THREAD, ThreadResponse } from '../index';
import * as fetchManyActions from '../fetchMany';

describe('fetch many threads', () => {
  test('start fetching threads', () => {
    expect(fetchManyActions.threadsFetching(true)).toEqual({
      isLoading: true,
      type: THREAD.THREADS_FETCHING,
    });
  });

  test('finish fetching threads', () => {
    expect(fetchManyActions.threadsFetching(false)).toEqual({
      isLoading: false,
      type: THREAD.THREADS_FETCHING,
    });
  });

  test('fail gracefully when fetching threads', () => {
    expect(fetchManyActions.threadsFetchingHasFailed('Error')).toEqual({
      errorMessage: 'Error',
      type: THREAD.THREADS_FETCHING_HAS_FAILED,
    });
  });

  // @TODO Test actual fetching of threads
});
