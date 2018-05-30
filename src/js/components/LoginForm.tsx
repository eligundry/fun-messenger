import * as React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { AuthenticationState } from '../reducers/auth';
import { State } from '../store';
import { sendLoginData } from '../actions/auth/login';

export interface LoginFormProps extends React.Props {
  auth: AuthenticationState;
  email: string;
  password: string;
  submit(string, string): Promise;
  change(object): void;
}

export const LoginForm: React.SFC<LoginFormProps> = (props: LoginFormProps) => {
  const { email, password, submit } = props;
  const { error } = props.auth;

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(email, password);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        id="email"
        value={email}
        type="email"
        required
      />
      <TextField
        label="Password"
        id="password"
        value={password}
        type="password"
        required
      />
      <Button variant="raised" color="primary" onClick={handleSubmit}>
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
