import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { connect } from 'react-redux';


const paperStyle = {
  margin: 0,
  padding: 20,
  textAlign: 'center',
};

class TaskList extends Component {

  constructor() {
    super();
  }

	static mapStateToProps(state) {
		return {
			getTasksList: () => state.TasksList.taskList
		}
	}

  render() {
    return (
      <div>
        <Paper style={paperStyle}>
					<Table>
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
      </div>
    );
  }
}

export default connect(TaskList.mapStateToProps)(TaskList)
