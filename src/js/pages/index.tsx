import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';

import Login from './Login';
import SignUp from './SignUp';

export const Index = (store, history) => (
  <ConnectedRouter store={store} history={history}>
    <React.Fragment>
      <Route exact path='/' component={Login} />
      <Route exact path='/sign-up' component={SignUp} />
    </React.Fragment>
  </ConnectedRouter>
);

export default Index;
