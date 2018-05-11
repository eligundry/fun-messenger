import { MESSAGE_SENDING, MESSAGE_SENT, MESSAGE_SENDING_HAS_ERRORED } from '../actions/index';


export const messageSent = (state = false, action) => {
  switch (action.type) {
    case MESSAGE_SENDING:
      return {
        threadID: action.threadID,
        isSending: action.isSending,
      };
    default:
      return state;
  }
};

export const messageSendingHasErrored = (state = false, action) => {
  switch (action.type) {
    case MESSAGE_SENDING_HAS_ERRORED:
      return {
        threadID: action.threadID,
        errorMessage: action.errorMessage,
        text: action.text,
      };
    default:
      return state;
  }
};

export const messages = (state = [], action) => {
  switch (action.type) {
    case MESSAGE_SENT:
      return {
        threadID: action.threadID,
        message: action.message,
      };
    default:
      return state;
  }
};
