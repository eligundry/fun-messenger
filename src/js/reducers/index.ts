import { combineReducers } from 'redux';

import { messages } from './messages';
import { threads } from './threads';

export default combineReducers({
  messages,
  threads,
});
