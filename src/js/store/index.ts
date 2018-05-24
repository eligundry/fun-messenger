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
