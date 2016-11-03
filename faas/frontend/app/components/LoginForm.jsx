import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

class LoginForm extends Component {

  constructor() {
    super();
    this.getError = this.getError.bind(this);
  }

  getError(fieldname) {
    console.log('getError')
    console.log(this.props.errors)
    if (this.props.errors.hasOwnProperty(fieldname))
      return this.props.errors[fieldname];
    return "";
  }

  render() {
    return (
      <form>
        <Field name="username" component={TextField} hintText="Username"
          errorText={this.getError('username')}/>
        <Field name="password" component={TextField} hintText="Password"
          type="password" errorText={this.getError('password')} />

        <p style={{color: "rgb(244, 67, 54)"}} >{this.getError('non_field_errors')}</p>
      </form>

    )
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'loginForm'
})(LoginForm)
