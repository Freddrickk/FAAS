import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

class SignupForm extends Component {

  constructor() {
    super();
    this.getError = this.getError.bind(this);
  }

  getError(fieldname) {
    if (this.props.errors.hasOwnProperty(fieldname))
      return this.props.errors[fieldname];
    return "";
  }

  render() {
    return (
      <form>
        <Field name="username" component={TextField} hintText="Username"
          errorText={this.getError('username')}/>
        <Field name="email" component={TextField} hintText="Email"
          errorText={this.getError('email')}/>
        <Field name="password1" component={TextField} hintText="Password"
          type="password" errorText={this.getError('password1')} />
        <Field name="password2" component={TextField} hintText="Retype your password"
          type="password" errorText={this.getError('password2')} />
        <p style={{color: "rgb(244, 67, 54)"}} >{this.getError('non_field_errors')}</p>
      </form>

    )
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'signupForm'
})(SignupForm)
