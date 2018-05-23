import { combineReducers } from 'redux';

import { auth } from './auth';
import { messages } from './messages';
import { threads } from './threads';

export const makeRootReducer = (reducers: object = {}): object => {
  return combineReducers({
    auth,
    messages,
    threads,
    ...reducers,
  });
};

export default makeRootReducer;
