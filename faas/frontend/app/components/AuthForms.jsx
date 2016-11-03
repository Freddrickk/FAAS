import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux'

import LoginForm from './LoginForm.jsx'
import { startLoginFetching } from '../actions/UI'
import { fetchLogin } from '../actions/User'

const buttonStyle = {marginTop: "20px", marginRight: "20px"};
class AuthForms extends Component {

  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.showProgress = this.showProgress.bind(this);
  }

  static mapStateToProps(state) {
    return {
      getLoginCreds: () => {
        return state.form.loginForm.values;
      },
      buttonIsBlocked: () => {
        return typeof state.form.loginForm === 'undefined' ||
               typeof state.form.loginForm.values === 'undefined';
      },
      isFetching: () => {
        return state.UI.loginIsFetching;
      },
      getErrors: () => {
        return state.FormsErrors.loginForm;
      }
    }
  }

  static mapDispatchToProps(dispatch) {
    return {
      loginRequest: (creds) => {
        dispatch(fetchLogin(creds));
      }
    }
  }

  showProgress() {
    if (this.props.isFetching())
      return <CircularProgress size={25} thickness={2} />;
    else
      return "";
  }

  submit(e) {
    e.preventDefault();
    let creds = Object.assign({}, this.props.getLoginCreds());
    this.props.loginRequest(creds);
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm errors={this.props.getErrors()} />
        <RaisedButton label="Sign in" style={buttonStyle}
          primary={true} onClick={this.submit}
          disabled={this.props.buttonIsBlocked()}
        />
        {this.showProgress()}

      </div>
    );
  }
}

export default connect(AuthForms.mapStateToProps, AuthForms.mapDispatchToProps)(AuthForms);
