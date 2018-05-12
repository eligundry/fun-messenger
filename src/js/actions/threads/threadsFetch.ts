import { THREAD, ThreadResponse } from './index';
import fetch from '../utils/fetch';

export const threadsFetching = (isLoading: boolean) => ({
  isLoading,
  type: THREAD.THREADS_FETCHING,
});

export const threadsFetched = (threads: ThreadProps[]) => ({
  threads,
  type: THREAD.THREADS_FETCHED,
});

export const threadsFetchingHasFailed = (errorMessage: string) => ({
  errorMessage,
  type: THREAD.THREADS_FETCHING_HAS_FAILED,
});

export const fetchThreadsData = () => {
  return (dispatch) => {
    dispatch(threadsFetching(true));

    return fetch('/api/threads', { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(threadsFetching(false));

        return response;
      })
      .then(response => response.json())
      .then(threads => dispatch(threadsFetched(threads)))
      .catch(err => dispatch(threadsFetchingHasFailed(err.message)));
  };
};
