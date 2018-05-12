import { THREAD, ThreadResponse } from './index';
import fetch from '../../utils/fetch';

export const threadFetching = (isLoading: boolean) => ({
  isLoading,
  type: THREAD.THREAD_FETCHING,
});

export const threadFetched = (thread: ThreadResponse) => ({
  thread,
  type: THREAD.THREAD_FETCHED,
});

export const threadFetchingHasFailed = (errorMessage: string) => ({
  errorMessage,
  type: THREAD.THREAD_FETCHING_HAS_FAILED,
});

export const fetchThreadData = (threadID: string): Promise => {
  return (dispatch) => {
    dispatch(threadFetching(true));

    return fetch(`/api/threads/${threadID}`, { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(threadFetching(false));

        return response;
      })
      .then(response => response.json)
      .then(thread => dispatch(threadFetched(thread)))
      .catch(err => dispatch());
  };
};
