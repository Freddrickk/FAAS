import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import ApplicationBar from './ApplicationBar.jsx';
import LoginModal from './LoginModal.jsx';

const paperStyle = {
  margin: 0,
  padding: 20,
  textAlign: 'center',
};

class MainUI extends Component {

  render() {
    return (
      <div>
        <ApplicationBar/>
        <Paper style={paperStyle}>
          <h1>You are not connected</h1>
          <p> Please auhtenticate to begin fuzzing stuff</p>
        </Paper>
        <LoginModal />

      </div>
    );
  }
}

export default MainUI;
