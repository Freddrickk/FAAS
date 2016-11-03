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
import { logout } from '../actions/User'

class LoginButton extends Component {
  static muiName = 'FlatButton';

  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this)
  }

  static mapStateToProps(state) {
    return {
      isConnected: () => state.User.isConnected,
      getToken: () => state.User.credentials.token
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      openLoginModal: () => dispatch(openLoginModal()),
      logout: token => dispatch(logout(token))
    }
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logout(this.props.getToken());
  }

  render() {
    if (!this.props.isConnected())
      return (
        <FlatButton style={this.props.style} onClick={this.props.openLoginModal} label="Login" />
      );
    else
      return (
        <FlatButton style={this.props.style} onClick={this.onLogout} label="Logout" />
      );
  }
}
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
