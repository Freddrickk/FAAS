import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'

import { closeLoginModal } from '../actions/UI'


/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
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
          title="Authentication"
          actions={actions}
          modal={true}
          open={this.props.isOpen()}
        >
          Only actions can close this dialog.
          Only actions can close this dialog.
          Only actions can close this dialog.
        </Dialog>
      </div>
    );
  }
}
export default connect(LoginModal.mapStateToProps, LoginModal.mapDispatchToProps)(LoginModal)
