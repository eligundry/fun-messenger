import * as React from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import sendLoginData from '../actions/auth/logIn';

export interface LoginFormProps extends React.Props {
  email: string;
  password: string;
  submit(): Promise;
}

export const LoginForm: React.SFC<LoginFormProps> = (props: LoginFormProps) => {
  const { email, password } = props;
  const handleSubmit = (event) => {
    event.preventDefault();
    props.submit(email, password);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" value={email} type="email"></Input>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input id="password" value={password} type="password"></Input>
      </FormControl>
      <FormControl>
        <Button variant="raised" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

const mapStateToProps = () => {};
const mapDispatchToProps = (dispatch) => {
  return {
    submit: (email: string, password: string) => {
      return dispatch(sendLoginData(email, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
