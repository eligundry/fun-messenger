import { ThreadProps } from '../components/Thread';
import fetch from '../utils/fetch';

export const THREAD_CONSTS = {
  THREAD_CREATING: 'THREAD_CREATING',
  THREAD_CREATED: 'THREAD_CREATED',
  THREAD_CREATING_HAS_FAILED: 'THREAD_CREATING_HAS_FAILED',
  THREADS_FETCHING: 'THREADS_FETCHING',
  THREADS_FETCHED: 'THREADS_FETCHED',
  THREADS_FETCHING_HAS_FAILED: 'THREADS_FETCHING_HAS_FAILED',
  THREAD_FETCHING: 'THREAD_FETCHING',
  THREAD_FETCHED: 'THREAD_FETCHED',
  THREAD_FETCHING_HAS_FAILED: 'THREAD_FETCHING_HAS_FAILED',
};

export const threadCreating = (isLoading: boolean) => ({
  isLoading,
  type: THREAD_CONSTS.THREAD_CREATING,
});

export const threadCreated = (thread: ThreadProps) => ({
  thread,
  type: THREAD_CONSTS.THREAD_CREATED,
});

export const threadCreatingHasFailed = (errorMessage: string) => ({
  errorMessage,
  type: THREAD_CONSTS.THREAD_CREATING_HAS_FAILED,
});

export const createThreadData = (threadData): Promise => {
  return (dispatch) => {
    dispatch(threadCreating(true));

    return fetch('/api/threads', {
      method: 'POST',
      body: threadData,
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(threadCreating(false));

        return response;
      })
      .then(response => response.json())
      .then(thread => dispatch(threadCreated(thread)))
      .catch(err => dispatch(threadCreatingHasFailed(err.message)));
  };
};

export const threadsFetching = (isLoading: boolean) => ({
  isLoading,
  type: THREAD_CONSTS.THREADS_FETCHING,
});

export const threadsFetched = (threads: ThreadProps[]) => ({
  threads,
  type: THREAD_CONSTS.THREADS_FETCHED,
});

export const threadsFetchingHasFailed = (errorMessage: string) => ({
  errorMessage,
  type: THREAD_CONSTS.THREADS_FETCHING_HAS_FAILED,
});

export const fetchThreadsData = (): Promise => {
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

export const threadFetching = (isLoading: boolean) => ({
  isLoading,
  type: THREAD_CONSTS.THREAD_FETCHING,
});

export const threadFetched = (thread: ThreadProps) => ({
  thread,
  type: THREAD_CONSTS.THREAD_FETCHED,
});

export const threadFetchingHasFailed = (errorMessage: string) => ({
  errorMessage,
  type: THREAD_CONSTS.THREAD_FETCHING_HAS_FAILED,
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
