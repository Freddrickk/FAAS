import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'

import { closeLoginModal, LOGIN_FORM, SIGNUP_FORM } from '../actions/UI'
import LoginWrapper from './LoginWrapper.jsx'
import SignupWrapper from './SignupWrapper.jsx'


const modalStyle = {
  width: '100%',
  maxWidth: 'none',
};

class AuthModal extends Component {

  static mapStateToProps(state) {
    return {
      isOpen: () => {
        return state.UI.loginModalIsOpen;
      },
      getCurrentForm: () => state.UI.activeAuthForm
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      closeModal: () => {
        dispatch(closeLoginModal());
      }
    };
  }

  renderForm(currentForm) {
    switch (currentForm) {
      case LOGIN_FORM:
        return (<LoginWrapper />);
      case SIGNUP_FORM:
        return (<SignupWrapper />);
    }
  }

  render() {
    return (
      <div>
        <Dialog
          style={modalStyle}
          open={this.props.isOpen()}
          onRequestClose={this.props.closeModal}
        >
          {this.renderForm(this.props.getCurrentForm())}
        </Dialog>
      </div>
    );
  }
}
export default connect(AuthModal.mapStateToProps, AuthModal.mapDispatchToProps)(AuthModal)
