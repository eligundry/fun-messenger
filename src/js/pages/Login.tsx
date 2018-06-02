import * as React from 'react';

import LoginForm from '../components/LoginForm';
import { sendLoginData } from '../actions/auth/login';

export class Login extends React.Component {
  submit = values => {
    console.log(values);
    debugger;
  }

  render() {
    return (
      <LoginForm onSubmit={this.submit} />
    );
  }
}

export default Login;
