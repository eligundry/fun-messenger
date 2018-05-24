import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import createHistory from 'history/createBrowserHistory';

import { Index } from './pages/index';
import { reactRouterStore } from './store/configureStore';

// React Router & Redux Store
const history = createHistory();
const store = reactRouterStore(history);
const Router = Index(store, history);
console.log(store.getState());

const App = () => (
  <Provider store={store}>
    <React.Fragment>
      <CssBaseline />
      {Router}
    </React.Fragment>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
