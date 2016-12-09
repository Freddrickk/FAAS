import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { openTaskModal, closeTaskModal } from '../actions/UI';
import { fetchTaskDetail } from '../actions/TasksList';

const paperStyle = {
  margin: 0,
  padding: 20,
  textAlign: 'center',
};

class TaskDialogModal extends React.Component {

	constructor () {
		super();
		this.renderTaskDetail = this.renderTaskDetail.bind(this);
	}

	static mapStateToProps(state) {
		return {
			modalIsOpen: () => state.UI.taskModalIsOpen,
			getCurrentTask: () => state.TasksList.currentTask
		}
	}

	static mapDispatchToProps(dispatch){
		return{
			closeTaskModal: () => dispatch(closeTaskModal())
		}
	}

	renderTaskDetail(){
		var currentTask = this.props.getCurrentTask();
		if(currentTask){
			console.log(currentTask);
			return (<div>
					NAME : {currentTask.name} <br/> <br/>
					DESCRIPTION: {currentTask.description} <br/> <br/>
					TEMPLATE : {currentTask.template}
					</div>);
		}
		return "";
	}


  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.props.closeTaskModal}
      />
    ];

    return (
      <div>
        <Dialog
          title="Detail task"
          actions={actions}
          modal={true}
          open={this.props.modalIsOpen()}
        >
      	{this.renderTaskDetail()}
        </Dialog>
      </div>
    );
  }
}

var ConnectedModal = connect(TaskDialogModal.mapStateToProps, TaskDialogModal.mapDispatchToProps)(TaskDialogModal)

class TaskList extends Component {

  constructor() {
    super();
    this.handleOnClickRow = this.handleOnClickRow.bind(this);
  }

	static mapStateToProps(state) {
		return {
			getToken: () => state.User.credentials.token,
			getTasksList: () => state.TasksList.taskList,
			getTaskInformation: (indexTask) => state.TasksList.taskList[indexTask]
		}
	}

	static mapDispatchToProps(dispatch) {
		return{
			openTaskModal: () => dispatch(openTaskModal()),
			fetchTaskDetail : (token, idTask) => dispatch(fetchTaskDetail(token, idTask))
		}
	}

	handleOnClickRow = (indexRow) => {
		var oTask = this.props.getTaskInformation(indexRow);
		console.log(oTask);
		if(oTask){
			var idTask = oTask.id;
			console.log(idTask);	
			this.props.fetchTaskDetail(this.props.getToken(), idTask);
			this.props.openTaskModal();
		}
	}

  render() {
    return (
      <div>
        <Paper style={paperStyle}>
					<Table onRowSelection={this.handleOnClickRow}>
						<TableHeader displaySelectAll={false}>
							<TableRow>
								<TableHeaderColumn colSpan="3" tooltip="Fuzzing Task List" style={{textAlign: 'center'}}>
									Fuzzing Task List
								</TableHeaderColumn>
							</TableRow>
							<TableRow>
								<TableHeaderColumn>Name</TableHeaderColumn>
								<TableHeaderColumn>Owner</TableHeaderColumn>
								<TableHeaderColumn>Description</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false}>
							{this.props.getTasksList().map( (row, index) => (
								<TableRow key={index} selected={row.selected}>
									<TableRowColumn>{row.name}</TableRowColumn>
									<TableRowColumn>{row.owner}</TableRowColumn>
		            <TableRowColumn>{row.description}</TableRowColumn>
		          </TableRow>
		          ))}
			</TableBody>
		  </Table>
        </Paper>
        <ConnectedModal />
      </div>
    );
  }
}


export default connect(TaskList.mapStateToProps, TaskList.mapDispatchToProps)(TaskList)

