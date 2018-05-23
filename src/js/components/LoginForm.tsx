import * as React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

export class LoginForm extends React.Component {
  handleSubmit() {

  }

  render() {
    return (
      <form>
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" value={this.state.email} type="email"></Input>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" value={this.state.password} type="password"></Input>
        </FormControl>
      </form>
    );
  }
}
