import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import TaskForm from './TaskForm.jsx';
import ApplicationBar from './ApplicationBar.jsx';
import AuthModal from './AuthModal.jsx';
import { connect } from 'react-redux';

const paperStyle = {
  margin: 0,
  padding: 20,
  textAlign: 'center',
};

class MainUI extends Component {

  constructor() {
    super();
    this.getHomeText = this.getHomeText.bind(this);
    this.showTaskForm = this.showTaskForm.bind(this);
  }

  static mapStateToProps(state) {
    return {
      isConnected: () => state.User.isConnected,
      getUsername: () => state.User.credentials.username
    };
  }

  showTaskForm() {
    if (this.props.isConnected())
      return(
        <TaskForm />
      );
    return(
      ""
    );
  }

  getHomeText() {
    if (!this.props.isConnected())
      return(
        <div>
          <h1>You are not connected</h1>
          <p>Please authenticate to begin fuzzing stuff</p>
        </div>
      );
    return(
      <div>
        <h1>Hello, {this.props.getUsername()}</h1>
        <p>Let us show you how we have flattened the triangle.</p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <ApplicationBar/>
        <Paper style={paperStyle}>
          {this.getHomeText()}
        </Paper>
        {this.showTaskForm()}
        <AuthModal />
      </div>
    );
  }
}

export default connect(MainUI.mapStateToProps)(MainUI);
