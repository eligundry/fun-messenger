import { THREAD_CONSTS } from '../actions/threads';

export const threads = (state = {}, action) => {
  switch (action.type) {
    case THREAD_CONSTS.THREAD_CREATING:
      return state;

    case THREAD_CONSTS.THREAD_CREATED:
      const newThread = { ...action.thread };
      newThread.messages = newThread.messages.map(message => message.id);

      return { ...state, [newThread.id]: newThread };

    case THREAD_CONSTS.THREAD_CREATING_HAS_FAILED:
      return state;

    case THREAD_CONSTS.THREADS_FETCHING:
      return state;

    case THREAD_CONSTS.THREADS_FETCHED:
      const newThreads = action.threads.reduce((threads, thread) => {
        // Convert the nested messages into an array of message IDs
        thread.messages = thread.messages.map(message => message.id);

        // Key the new object to the thread ID with the thread data within.
        threads[thread.id] = thread;

        return threads;
      }, {});

      return { ...state, ...newThreads };

    case THREAD_CONSTS.THREADS_FETCHING_HAS_FAILED:
      return state;

    default:
      return state;
  }
};
