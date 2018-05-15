import { MESSAGE, MessageResponse } from '../actions/messages';
import { THREAD, ThreadResponse } from '../actions/threads';

export interface MessageState {
  [key: string]: MessageResponse;
}

export const messages = (state: MessageState = {}, action: any) => {
  switch (action.type) {
    case MESSAGE.MESSAGE_SENDING:
      return state;

    case MESSAGE.MESSAGE_SENT:
      // Append the message to all the messages.
      return { ...state, [action.message.id]: action.message };

    case MESSAGE.MESSAGE_SENDING_HAS_FAILED:
      return state;

    case THREAD.THREADS_FETCHED:
      // Extract all the messages from all the threads and key the bodies of the
      // messages to the message ID.
      const threadsMessages: MessageState = action.threads.reduce(
          (messages: MessageState, thread: ThreadResponse) => {
            thread.messages.forEach((message: MessageResponse) => {
              messages[message.id] = message;
            });

            return messages;
          },
        {},
      );

      return { ...state, ...threadsMessages };

    case THREAD:THREAD_CREATED:
    case THREAD.THREAD_FETCHED:
      // Extract all the messages from the thread and key the bodies to the
      // message ID.
      const threadMessages: MessageState = action.thread.messages.reduce(
        (messages: MessageState, message: MessageResponse) => {
          messages[message.id] = message;
          return messages;
        },
        {},
      );

      return { ...state, ...threadMessages };

    default:
      return state;
  }
};
