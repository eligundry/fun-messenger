import MessageResponse from '../messages';

export enum THREAD {
  THREADS_FETCHING = 'THREADS_FETCHING',
  THREAD_FETCHING = 'THREAD_FETCHING',
  THREAD_FETCHING_HAS_FAILED = 'THREAD_FETCHING_HAS_FAILED',
  THREAD_CREATING: 'THREAD_CREATING',
  THREAD_CREATED: 'THREAD_CREATED',
  THREAD_CREATING_HAS_FAILED: 'THREAD_CREATING_HAS_FAILED',
}

export interface ThreadResponse {
  id: string,
  title: string,
  messages: MessageResponse[],
}
