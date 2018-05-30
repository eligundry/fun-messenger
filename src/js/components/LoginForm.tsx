import * as React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Response } from 'node-fetch';
import { connect } from 'react-redux';

import { AuthenticationState } from '../reducers/auth';
import { State } from '../store';
import { sendLoginData } from '../actions/auth/login';

export interface LoginFormProps extends React.Props {
  auth: AuthenticationState;
  submit(string, string): Promise<Response>;
}

export const LoginForm: React.SFC<LoginFormProps> = (props: LoginFormProps) => {
  const { submit } = props;
  const { error } = props.auth;

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    submit(email, password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        id="email"
        type="email"
        name="email"
        required
      />
      <TextField
        label="Password"
        id="password"
        type="password"
        name="password"
        required
      />
      <Button variant="raised" color="primary" type="submit">
        Submit
      </Button>
      <Snackbar
        message={error}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={200}
        open={!!error}
      />
    </form>
  );
};

const mapStateToProps = (state: State) => {
  return {
    auth: state.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    submit: (email: string, password: string) => {
      return dispatch(sendLoginData(email, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
