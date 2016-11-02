import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { connect } from 'react-redux'

import { openLoginModal } from '../actions/UI';

class LoginButton extends Component {
  static muiName = 'FlatButton';

  state = {
    logged: false,
  };

  static mapStateToProps(state) {
    return {};
  }

  static mapDispatchToProps(dispatch) {
    return {
      openLoginModal: () => {
        dispatch(openLoginModal());
      }
    }
  }

  render() {
    if (!this.state.logged)
      return (
        <FlatButton style={this.props.style} onClick={this.props.openLoginModal} label="Login" />
      );
    else
      return (
        <FlatButton style={this.props.style} label="Logout" />
      );
  }
}
console.log(LoginButton);
const VisibleLoginButton = connect(
  LoginButton.mapStateToProps,
  LoginButton.mapDispatchToProps
)(LoginButton);


class ApplicationBar extends Component {

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  render() {
    return (
      <div>
        <AppBar
          title="Fuzzer as a service"
          iconElementRight={<VisibleLoginButton />}
        />
      </div>
    );
  }
}

export default ApplicationBar;
