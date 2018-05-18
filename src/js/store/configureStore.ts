import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import { rootReducer } from '../reducers';
import { AuthenticationState, initialState as authInitialState } from '../reducers/auth';
import { MessageState, initialState as messagesInitialState } from '../reducers/messages';
import { ThreadState, initialState as threadsInitialState } from '../reducers/threads';

export interface State {
  authentication: AuthenticationState;
  messages: MessageState;
  threads: ThreadState;
}

export const emptyState: State = {
  authentication: authInitialState,
  messages: messagesInitialState,
  threads: threadsInitialState,
};

export const configureStore = (initialState: State = emptyState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk),
  );
};

export default configureStore;
