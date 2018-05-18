import { ErrorAction, LoadingAction } from '../index';
import { THREAD, ThreadResponse } from './index';
import fetch from '../../utils/fetch';

export interface ThreadsFetchedAction {
  threads: ThreadResponse[];
  type: THREAD.THREADS_FETCHED;
}

export const threadsFetching = (isLoading: boolean): LoadingAction => ({
  isLoading,
  type: THREAD.THREADS_FETCHING,
});

export const threadsFetched = (threads: ThreadResponse[]): ThreadsFetchedAction => ({
  threads,
  type: THREAD.THREADS_FETCHED,
});

export const threadsFetchingHasFailed = (errorMessage: string): ErrorAction => ({
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
