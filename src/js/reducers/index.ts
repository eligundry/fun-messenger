import { combineReducers } from 'redux';

import { auth } from './auth';
import { messages } from './messages';
import { threads } from './threads';

export const rootReducer = combineReducers({
  auth,
  messages,
  threads,
});

export default rootReducer;
