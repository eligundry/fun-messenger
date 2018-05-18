import fetch from '../../utils/fetch';
import { MESSAGE, MessageResponse, MessagePayload } from './index';

export const messageSending = (isLoading: boolean) => ({
  isLoading,
  type: MESSAGE.MESSAGE_SENDING,
});

export const messageSent = (message: MessageResponse) => ({
  message,
  type: MESSAGE.MESSAGE_SENT,
});

export const messageSendingHasFailed = (errorMessage: string) => ({
  errorMessage,
  type: MESSAGE.MESSAGE_SENDING_HAS_FAILED,
});

export const sendMessageData = (threadID: string, messagePayload: MessagePayload) => {
  return (dispatch) => {
    dispatch(messageSending(true));

    return fetch(`/api/threads/${threadID}/messages`, {
      method: 'POST',
      body: messagePayload,
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
      .catch(err => dispatch(messageSendingHasFailed(err.message)));
  };
};
