import { ActionTypes } from '../actions';
import { MessageResponse } from '../actions/messages';
import { THREAD, ThreadResponse } from '../actions/threads';

export interface ThreadItem {
  id: string;
  title: string;
  messages: string[];
}

export interface ThreadState {
  [key: string]: ThreadItem;
}

export const initialState: ThreadState = {};

export const threads = (state: ThreadState = initialState, action: ActionTypes): ThreadState => {
  switch (action.type) {
    case THREAD.THREAD_CREATING:
      return state;

    case THREAD.THREAD_FETCHED:
    case THREAD.THREAD_CREATED:
      const newThread: ThreadItem = {
        id: action.thread.id,
        title: action.thread.title,
        messages: action.thread.messages.map(
          (message: MessageResponse): string => message.id
        ),
      };

      return { ...state, [newThread.id]: newThread };

    case THREAD.THREAD_CREATING_HAS_FAILED:
      return state;

    case THREAD.THREAD_FETCHING:
    case THREAD.THREADS_FETCHING:
      return state;

    case THREAD.THREADS_FETCHED:
      const newThreads: ThreadState = action.threads.reduce(
        (threads: ThreadState, thread: ThreadResponse): ThreadState => {
          // Key the new object to the thread ID with the thread data within.
          threads[thread.id] = {
            id: thread.id,
            title: thread.title,
            // Convert the nested messages into an array of message IDs
            messages: thread.messages.map(
              (message: MessageResponse): string => message.id,
            ),
          };

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
