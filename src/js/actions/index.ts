import { fetch } from '../utils/http';

export const MESSAGE_SENDING = 'MESSAGE_SENDING';
export const MESSAGE_SENT = 'MESSAGE_SENT';
export const MESSAGE_SENDING_HAS_ERRORED = 'MESSAGE_SENDING_HAS_ERRORED';

export const messageSending = (threadID: string, isSending: boolean) => ({
  type: MESSAGE_SENDING,
  threadID,
})

export const messageSent = (threadID: string, message: Object) => ({
  type: SEND_MESSAGE,
  threadID,
  message,
});

export const messageSendingHasErrored = (threadID: string, text: string, errorMessage: string) => ({
  type: MESSAGE_SENDING_HAS_ERRORED,
  text,
  errorMessage,
})


export const sendMessageData = (threadID, text) => {
  return (dispatch) => {
    fetch(`${window.location.origin}/api/thread/${threadID}/messages`, {
      method: 'POST',
      body: {
        text: text,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .then(res => res.json())
      .then(message => dispatch(messageSent(threadID, message)))
      .catch((err) => dispatch(messageSendingHasErrored(threadID, text, err.message)));
  };
};
