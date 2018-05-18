import { AUTHENTICATION } from './auth';
import { LoggedInAction, LogOutAction } from './auth/logIn';
import { MESSAGE } from './messages';
import { MessageSentAction } from './messages/send';
import { THREAD } from './threads';
import { ThreadCreatedAction } from './threads/create';
import { ThreadFetchedAction } from './threads/fetch';
import { ThreadsFetchedAction } from './threads/fetchMany';

export interface LoadingAction {
  isLoading: boolean;
  type: AUTHENTICATION.LOGGING_IN
    | MESSAGE.MESSAGE_SENDING
    | THREAD.THREADS_FETCHING
    | THREAD.THREAD_FETCHING
    | THREAD.THREAD_CREATING;
}

export interface ErrorAction {
  errorMessage: string;
  type: AUTHENTICATION.LOGGING_IN_HAS_FAILED
    | MESSAGE.MESSAGE_SENDING_HAS_FAILED
    | THREAD.THREAD_FETCHING_HAS_FAILED
    | THREAD.THREADS_FETCHING_HAS_FAILED
    | THREAD.THREAD_CREATING_HAS_FAILED;
}

export type ActionTypes =
  | LoadingAction
  | ErrorAction
  | LoggedInAction
  | LogOutAction
  | MessageSentAction
  | ThreadCreatedAction
  | ThreadFetchedAction
  | ThreadsFetchedAction;
