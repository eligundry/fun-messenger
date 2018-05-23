import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';

import { makeRootReducer } from '../reducers';
import { AuthenticationState, initialState as authInitialState } from '../reducers/auth';
import { MessageState, initialState as messagesInitialState } from '../reducers/messages';
import { ThreadState, initialState as threadsInitialState } from '../reducers/threads';

export interface State {
  auth: AuthenticationState;
  messages: MessageState;
  router?: object;
  threads: ThreadState;
}

export const emptyState: State = {
  auth: authInitialState,
  messages: messagesInitialState,
  threads: threadsInitialState,
};

export const configureStore = (initialState: State = emptyState) => {
  return createStore(
    makeRootReducer(),
    initialState,
    applyMiddleware(reduxThunk),
  );
};

export const reactRouterStore = (history, initialState: State = emptyState) => {
  return createStore(
    makeRootReducer({
      router: routerReducer,
    }),
    initialState,
    applyMiddleware(reduxThunk, routerMiddleware(history)),
  );
};

export default configureStore;
