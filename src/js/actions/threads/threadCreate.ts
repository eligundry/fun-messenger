import { MessageResponse } from '../messages';
import { THREAD, ThreadResponse } from './index';
import fetch from '../../utils/fetch';

export const threadCreating = (isLoading: boolean) => ({
  isLoading,
  type: THREAD.THREAD_CREATING,
});

export const threadCreated = (thread: ThreadResponse) => ({
  thread,
  type: THREAD.THREAD_CREATED,
});

export const threadCreatingHasFailed = (errorMessage: string) => ({
  errorMessage,
  type: THREAD.THREAD_CREATING_HAS_FAILED,
});

export const createThreadData = (threadData) => {
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
      .then((thread: ThreadResponse) => dispatch(threadCreated(thread)))
      .catch(err => dispatch(threadCreatingHasFailed(err.message)));
  };
};
