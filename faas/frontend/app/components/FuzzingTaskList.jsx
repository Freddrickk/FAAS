import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import ApplicationBar from './ApplicationBar.jsx';
import { connect } from 'react-redux';

const paperStyle = {
  margin: 0,
  padding: 20,
  textAlign: 'center',
};

class FuzzingTaskList extends Component {

  constructor() {
    super();
  }


  getHomeText() {
    return(
      <div>
        <h1>Hello</h1>
        <p>Fuzzing task list.</p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Paper style={paperStyle}>
          {this.getHomeText()}
        </Paper>
      </div>
    );
  }
}

export default FuzzingTaskList;
