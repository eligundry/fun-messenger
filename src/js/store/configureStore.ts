import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import { rootReducer } from '../reducers';
import { AuthenticationState } from '../reducers/auth';
import { MessageState } from '../reducers/messages';
import { ThreadState } from '../reducers/threads';

export interface State {
  authentication: AuthenticationState;
  messages: MessageState;
  threads: ThreadState;
}

const configureStore = (initialState: State) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk),
  );
};

export default configureStore;
