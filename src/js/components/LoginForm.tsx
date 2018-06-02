import * as React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Response } from 'node-fetch';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { AuthenticationState } from '../reducers/auth';
import { State } from '../store';
import { sendLoginData } from '../actions/auth/login';

export interface LoginFormProps extends React.Props {
  handleSubmit(object): Promise<Response>;
}

export const LoginForm: React.SFC<LoginFormProps> = (props: LoginFormProps) => {
  const { handleSubmit } = props;
  // const { error } = props.auth;
  const error = null;

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Field
        component={TextField}
        label="Email"
        id="email"
        type="email"
        name="email"
        required
      />
      <Field
        component={TextField}
        label="Password"
        id="password"
        type="password"
        name="password"
        required
      />
      <Button variant="raised" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};

// export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export const ReduxLoginForm = reduxForm({
  form: 'login',
})(LoginForm)

export default connect(
  state => ({}),
  dispatch => ({
    onSubmit: (values) => dispatch(sendLoginData(values))
  })
)(ReduxLoginForm)
