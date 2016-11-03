import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux'

import SignupForm from './SignupForm.jsx'
import { fetchSignup } from '../actions/User'
import { activeLogin } from '../actions/UI'

const buttonStyle = {marginTop: "20px", marginRight: "20px"};

class SignupWrapper extends Component {

  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  static mapStateToProps(state) {
    return {
      getSignupCreds: () => state.form.signupForm.values,
      buttonIsBlocked: () => typeof state.form.signupForm === 'undefined' ||
                             typeof state.form.signupForm.values === 'undefined',
      getErrors: () => state.FormsErrors.signupForm,
    }
  }

  static mapDispatchToProps(dispatch) {
    return {
      signupRequest: (creds) => dispatch(fetchSignup(creds)),
      switchToLogin: () => dispatch(activeLogin())
    }
  }

  submit(e) {
    e.preventDefault();
    let creds = Object.assign({}, this.props.getSignupCreds());
    this.props.signupRequest(creds);
  }

  render() {
    return (
      <div>
        <h2>Signup</h2>
        <SignupForm errors={this.props.getErrors()} />
        <RaisedButton label="Register" style={buttonStyle}
          primary={true} onClick={this.submit}
          disabled={this.props.buttonIsBlocked()}
        />
        <RaisedButton label="I have an account"  style={buttonStyle}
          secondary={true} onClick={this.props.switchToLogin}
        />
      </div>
    );
  }
}

export default connect(SignupWrapper.mapStateToProps, SignupWrapper.mapDispatchToProps)(SignupWrapper);
