import { MessageResponse } from '../actions/messages';
import { THREAD, ThreadResponse } from '../actions/threads';

export interface ThreadItem {
  id: string;
  title: string;
  messages: string[];
}

export interface ThreadState {
  [key: string]: ThreadItem[];
}

export const initialState: ThreadState = {};

export const threads = (state: ThreadState = initialState, action) => {
  switch (action.type) {
    case THREAD.THREAD_CREATING:
      return state;

    case THREAD.THREAD_FETCHED:
    case THREAD.THREAD_CREATED:
      const newThread: ThreadItem = Object.assign({}, action.thread);
      newThread.messages = newThread.messages.map((message: MessageResponse) => message.id);

      return { ...state, [newThread.id]: newThread };

    case THREAD.THREAD_CREATING_HAS_FAILED:
      return state;

    case THREAD.THREAD_FETCHING:
    case THREAD.THREADS_FETCHING:
      return state;

    case THREAD.THREADS_FETCHED:
      const newThreads: ThreadState = action.threads.reduce(
        (threads: ThreadState, thread: ThreadResponse) => {
          // Key the new object to the thread ID with the thread data within.
          threads[thread.id] = Object.assign({}, thread);

          // Convert the nested messages into an array of message IDs
          threads[thread.id] = thread.messages.map(
            (message: MessageResponse) => message.id,
          );

          return threads;
        },
        {},
      );

      return { ...state, ...newThreads };

    case THREAD.THREAD_FETCHING_HAS_FAILED:
    case THREAD.THREADS_FETCHING_HAS_FAILED:
      return state;

    default:
      return state;
  }
};

export default threads;
