import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Messenger } from './components/Messenger';
import { configureStore, State } from './store/configureStore';

const exampleState: State = {};
const store = configureStore(exampleState);

const App = () => (
  <Provider store={store}>
    <Messenger {...exampleState} />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
