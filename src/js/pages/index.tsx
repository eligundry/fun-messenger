import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';

import Login from './Login';

export const Index = (store, history) => (
  <ConnectedRouter store={store} history={history}>
    <React.Fragment>
      <Route exact path='/' component={Login} />
    </React.Fragment>
  </ConnectedRouter>
);

export default Index;
