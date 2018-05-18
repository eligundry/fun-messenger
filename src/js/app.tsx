import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Messenger } from './components/Messenger';
import { configureStore } from './store/configureStore';

const store = configureStore();
console.log(store.getState());

const App = () => (
  <Provider store={store}>
    <Messenger />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
