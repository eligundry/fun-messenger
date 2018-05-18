import { ErrorAction, LoadingAction } from '../index';
import { MESSAGE, MessageResponse, MessagePayload } from './index';
import fetch from '../../utils/fetch';

export interface MessageSentAction {
  message: MessageResponse;
  type: MESSAGE.MESSAGE_SENT;
}

export const messageSending = (isLoading: boolean): LoadingAction => ({
  isLoading,
  type: MESSAGE.MESSAGE_SENDING,
});

export const messageSent = (message: MessageResponse): MessageSentAction => ({
  message,
  type: MESSAGE.MESSAGE_SENT,
});

export const messageSendingHasFailed = (errorMessage: string): ErrorAction => ({
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
