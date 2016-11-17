import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import TaskForm from './TaskForm.jsx';
import ApplicationBar from './ApplicationBar.jsx';
import AuthModal from './AuthModal.jsx';
import { connect } from 'react-redux';

import FuzzingTaskList from './FuzzingTaskList.jsx';
import CrashReportList from './CrashReportList.jsx';

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
	this.state = {pageToDisplay: "uploadFileMenu"};
  }

  static mapStateToProps(state) {
    return {
      isConnected: () => state.User.isConnected,
      getUsername: () => state.User.credentials.username
    };
  }

  showTaskForm() {
	if (this.props.isConnected()){
		if(this.state.pageToDisplay == "uploadFileMenu") {
		  return(
		    <TaskForm />
		  );
		} else if(this.state.pageToDisplay == "fuzzingTaskList"){
		  return(
			<FuzzingTaskList />
		  );
		} else if(this.state.pageToDisplay == "crashReportList"){
		  return(
			<CrashReportList />
		  );
		}
	}
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

  changeDetailPage(newPage) {
	this.setState({pageToDisplay: newPage});
  }

  render() {

    return (
		  <div>
		    <ApplicationBar changeDetailPage={this.changeDetailPage.bind(this)}/>
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
