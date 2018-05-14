import { THREAD, ThreadResponse } from '../index';
import * as fetchActions from '../fetch';

describe('fetch a thread', () => {
  test('starts fetching a thread', () => {
    expect(fetchActions.threadFetching(true)).toMatchObject({
      isLoading: true,
    });
  });
})
