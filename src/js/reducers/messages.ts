import { RECIEVE_MESSAGE, SEND_MESSAGE } from '../actions/index.ts';

const messages = (state = [], action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      console.log('Sent message', state);
      return [
        ...state,
        {}
      ];
    case RECIEVE_MESSAGE:
      console.log('Recived message', state);
      return [
        ...state,
        {}
      ];
    default:
      return state;
  }
}

export default messages;
