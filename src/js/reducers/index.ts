import { combineReducers } from 'redux'

import { messageSent, messageSendingHasErrored, messages } from './messages';

export default combineReducers({
  messages,
  messageSent,
  messageSendingHasErrored,
});
