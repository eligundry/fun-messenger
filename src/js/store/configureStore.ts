import { applyMiddleware, createStore, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import reduxThunk from 'redux-thunk';

import { makeRootReducer } from '../reducers';
import { State, emptyState } from './index';

export const configureStore = (initialState: State = emptyState) => {
  return createStore(
    makeRootReducer({
      form: formReducer,
    }),
    initialState,
    applyMiddleware(reduxThunk),
  );
};

export const reactRouterStore = (history, initialState: State = emptyState) => {
  return createStore(
    makeRootReducer({
      form: formReducer,
      router: routerReducer,
    }),
    initialState,
    applyMiddleware(reduxThunk, routerMiddleware(history)),
  );
};

export default configureStore;
