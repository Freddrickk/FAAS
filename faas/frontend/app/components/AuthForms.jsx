import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'

import LoginForm from './LoginForm.jsx'

const buttonStyle = {marginTop: "20px", }

class AuthForms extends Component {

  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  static mapStateToProps(state) {
    return {
      getLoginCreds: () => {
        return state.form.loginForm.values;
      },
      buttonIsBlocked: () => {
        return typeof state.form.loginForm === 'undefined' ||
               typeof state.form.loginForm.values === 'undefined';
      }
    }
  }

  static mapDispatchToProps(dispatch) {
    return {
      loginRequest: (creds) => {

      }
    }
  }

  submit(e) {
    e.preventDefault();
    let creds = this.props.getLoginCreds();
    console.log(creds);
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm />
        <RaisedButton label="Sign in" style={buttonStyle}
          primary={true} onClick={this.submit}
          disabled={this.props.buttonIsBlocked()}  />
      </div>
    );
  }
}

export default connect(AuthForms.mapStateToProps, AuthForms.mapDispatchToProps)(AuthForms);
