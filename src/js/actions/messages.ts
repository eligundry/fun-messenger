import { MessageProps } from '../components/Message';
import fetch from '../utils/fetch';

export const MESSAGE_CONSTS = {
  MESSAGE_SENDING: 'MESSAGE_SENDING',
  MESSAGE_SENT: 'MESSAGE_SENT',
  MESSAGE_SENDING_HAS_FAILED: 'MESSAGE_SENDING_HAS_FAILED',
};

export const messageSending = (isLoading: boolean) => ({
  isLoading,
  type: MESSAGE_CONSTS.MESSAGE_SENDING,
});

export const messageSent = (message: MessageProps) => ({
  message,
  type: MESSAGE_CONSTS.MESSAGE_SENT,
});

export const messageSendingHasFailed = (errorMessage: string) => ({
  errorMessage,
  type: MESSAGE_CONSTS.MESSAGE_SENDING_HAS_FAILED,
});

export const sendMessageData = (threadID, messageData) => {
  return (dispatch) => {
    dispatch(messageSending(true));

    return fetch(`/api/threads/${threadID}/messages`, {
      method: 'POST',
      body: messageData,
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(messageSending(false));

        return response;
      })
      .then(response => response.json())
      .then(message => dispatch(messageSent(message)))
      .catch(err => dispatch(messageSendingHasErrored(err.message)));
  };
};
