import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'

import { closeLoginModal } from '../actions/UI'
import AuthForms from './AuthForms.jsx'


const modalStyle = {
  width: '100%',
  maxWidth: 'none',
};

class LoginModal extends Component {

  static mapStateToProps(state) {
    return {
      isOpen: () => {
        return state.UI.loginModalIsOpen;
      }
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      closeModal: () => {
        dispatch(closeLoginModal());
      }
    };
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.props.closeModal}
      />,
    ];

    return (
      <div>
        <Dialog
          style={modalStyle}
          open={this.props.isOpen()}
          onRequestClose={this.props.closeModal}
        >
          <AuthForms />

        </Dialog>
      </div>
    );
  }
}
export default connect(LoginModal.mapStateToProps, LoginModal.mapDispatchToProps)(LoginModal)
