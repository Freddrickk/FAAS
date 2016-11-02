import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { TextField } from 'redux-form-material-ui'

class LoginForm extends Component {
  render() {
    return (
      <form>
        <Field name="username" component={TextField} hintText="Username"/>
        <Field name="password" component={TextField} hintText="Password" type="password"/>
      </form>
    )
  }
}

// Decorate with redux-form
export default reduxForm({
  form: 'loginForm'
})(LoginForm)
