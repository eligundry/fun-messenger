import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Messenger } from './components/Messenger';
import { ThreadProps } from './components/Thread';
import configureStore from './store/configureStore';

const store = configureStore();
const exampleState: object = {
  threads: [
    {
      id: 1,
      isSending: false,
      hasErrored: false,
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
    },
    {
      id: 2,
      isSending: false,
      hasErrored: false,
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
    },
  ],
};

const App = () => (
  <Provider store={store}>
    <Messenger {...exampleState} />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
