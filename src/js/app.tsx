import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Messenger } from './components/Messenger';
import { ThreadProps } from './components/Thread';
import rootReducer from './reducers';

const store = createStore(rootReducer);
const testThread: ThreadProps = {
  messages: [
    {
      id: 1,
      text: 'Hello world!',
    },
    {
      id: 2,
      text: 'Hello back!',
    },
  ],
};

// socket.io settings
const socketUri = `${window.location.origin}/api/ws`;
const socketOptions = {};

const App = () => (
  <Provider store={store}>
    <Messenger thread={testThread} />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
