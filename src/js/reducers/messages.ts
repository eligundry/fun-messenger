import { MESSAGE_CONSTS } from '../actions/messages';
import { THREAD_CONSTS } from '../actions/threads';

export const messages = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_CONSTS.MESSAGE_SENDING:
      return state;

    case MESSAGE_CONSTS.MESSAGE_SENT:
      return { ...state, [action.message.id]: action.message };

    case MESSAGE_CONSTS.MESSAGE_SENDING_HAS_FAILED:
      return state;

    case THREAD_CONSTS.THREADS_FETCHED:
      // Extract all the messages from all the threads and key the bodies of the
      // messages to the message ID.
      const newMessages = action.threads.reduce((messages, thread) => {
        thread.messages.forEach((message) => {
          messages[message.id] = message;
        }, {});

        return messages;
      }, {});

      return { ...state, ...newMessages };

    case THREAD_CONSTS.THREAD_FETCHED:
      // Extract all the messages from the thread and key the bodies to the
      // message ID.
      const newMessages = action.thread.messages.reduce((messages, message) => {
        messages[message.id] = message;
        return messages;
      }, {});

      return { ...state, ...newMessages };

    default:
      return state;
  }
};
