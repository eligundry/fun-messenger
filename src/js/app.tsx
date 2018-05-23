import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router';

import { reactRouterStore } from './store/configureStore';
import Login from './pages/Login';

// React Router & Redux Store
const history = createHistory();
const store = reactRouterStore(history);
console.log(store.getState());

const App = () => (
  <Provider store={store}>
    <CssBaseline />
    <ConnectedRouter history={history}>
      <div>
        <Route exact path='/' component={Login} />
      </div>
    </ConnectedRouter>
  </Provider>
);
console.log(App());

ReactDOM.render(<App />, document.getElementById('app'));
