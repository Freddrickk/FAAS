import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton';
import FileReaderInput from 'react-file-reader-input';

import { setBinaryFile, setBinaryName, uploadBinary } from '../actions/Task'


const paperStyle = {
  marginTop: 5,
  padding: 20,
  textAlign: 'left',
  display: 'block'
};

const buttonStyle = {
  margin: 12,
  marginLeft: 0,
}

class TaskDescriptionForm extends Component {

  render() {
    return (
      <form>
        <Field name="name" component={TextField} hintText="Name"
          multiLine={true} errorText={this.props.errorsFunc('name')}/>
        <Field name="description" component={TextField} hintText="Description"
          multiLine={true} errorText={this.props.errorsFunc('description')}  />

      </form>
    )
  }
}

const ReduxTaskDescriptionForm = reduxForm({
  form: 'taskDescriptionForm'
})(TaskDescriptionForm);


class TaskForm extends Component {

  constructor () {
    super();
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  static mapStateToProps = (state) => {
    return {
      getBinaryName: () => {
        let name = state.Task.binaryName
        if (name === "")
          return "Select a file"
        return name;
      },
      getFormData: () => state.form.taskDescriptionForm.values,
      getB64: () => state.Task.b64_binary_file,
      getToken: () => state.User.credentials.token,
      buttonIsBlocked: () => {
        return typeof state.form.taskDescriptionForm === 'undefined' ||
               typeof state.form.taskDescriptionForm.values === 'undefined';
      },
      getErrorMessage: (field) => {
        if (state.FormsErrors.taskUpload.hasOwnProperty(field))
          return state.FormsErrors.taskUpload[field]
        return "";
      }
    }
  }

  static mapDispatchToProps = (dispatch) => {
    return {
      setBinary: (b64File, bName) => {
        dispatch(setBinaryFile(b64File));
        dispatch(setBinaryName(bName));
      },
      upload: (b64, token) => dispatch(uploadBinary(b64, token))
    }
  }

  handleChange = (e, results) => {
    results.forEach(result => {
      const [e, file] = result;
      this.props.setBinary(btoa(e.target.result), file.name);
    });
  }

  onSubmit = (e) => {
    let request = Object.assign({}, this.props.getFormData(), {
      b64_binary_file: this.props.getB64()
    });
    let token = this.props.getToken()
    this.props.upload(request, token)


  }

  render() {
    return(
      <Paper zDepth={2} style={paperStyle}>
        <h3>Upload a binary file</h3>
        <ReduxTaskDescriptionForm errorsFunc={this.props.getErrorMessage} />
        <FileReaderInput as="binary" id="binary-file"
          onChange={this.handleChange}>
          <RaisedButton label={this.props.getBinaryName()} style={buttonStyle} />
        </FileReaderInput>
        <p style={{color: "rgb(244, 67, 54)"}} >{this.props.getErrorMessage('b64_binary_file')}</p>
        <RaisedButton onClick={this.onSubmit} primary={true} label="upload"
          style={buttonStyle} disabled={this.props.buttonIsBlocked()} />
      </Paper>
    );
  }
}

export default connect(TaskForm.mapStateToProps, TaskForm.mapDispatchToProps) (TaskForm)
