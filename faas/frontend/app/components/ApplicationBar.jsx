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
import { logout } from '../actions/User';

import Drawer from 'material-ui/Drawer';
import FuzzingTaskList from './FuzzingTaskList.jsx';

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


//injectTapEventPlugin();

class ApplicationBar extends Component {

  constructor(props){
	super(props);
	this.state = {open: false};
  }

  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };

  handleToggle = () => this.setState({open: !this.state.open});

  handleCloseAndNavigation = (event, logged) => {
	this.setState({open: false});
  };

  render(param) {
    return (
      <div>
		<Drawer
		docked={false}
		open={this.state.open}>
			<MenuItem onTouchTap={this.handleCloseAndNavigation} >Fuzzing Task List</MenuItem>
			<MenuItem onTouchTap={this.handleCloseAndNavigation}>Crash Report List</MenuItem>
		</Drawer>

		<header>
        <AppBar
		  onLeftIconButtonTouchTap={this.handleToggle}
          title="Fuzzer as a service"
          iconElementRight={<VisibleLoginButton />}
        />
		</header>
      </div>
    );
  }
}

export default ApplicationBar;
