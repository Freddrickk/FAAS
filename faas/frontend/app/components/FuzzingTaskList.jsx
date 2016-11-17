import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { connect } from 'react-redux';

import { loadTaskList } from '../actions/Task';

const paperStyle = {
  margin: 0,
  padding: 20,
  textAlign: 'center',
};

const tableData = [
  {
    name: 'fuzzing task numero 1',
    owner: 'Ben',
	description: 'ceci est une tache de fuzzing',
  },
  {
    name: 'fuzzing task numero 2',
    owner: 'Martin',
	description: 'fuzzing fuzzing',
  },
  {
    name: 'fuzzing task numero 3',
    owner: 'Fred',
	description: 'ola une autre tache',
  },
  {
    name: 'fuzzer fuzzer',
    owner: 'Ben',
	description: 'gogo',
  },
  {
    name: 'fuzzing task numero 4',
    owner: 'Ben',
	description: 'en avant',
  },
  {
    name: 'tache de fuzzing',
    owner: 'Fred',
	description: 'on fuzze',
  },
  {
    name: 'dqwd',
    owner: 'Martin',
	description: 'fuzze arg',
  },
];

class FuzzingTaskList extends Component {

  constructor() {
    super();

	this.state={
		displaySelectAll: false,
		displayRowCheckbox: false,
	}
  }

  render() {
    return (
      <div>
        <Paper style={paperStyle}>
		  <Table>
			<TableHeader displaySelectAll={this.state.displaySelectAll}>
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
			<TableBody displayRowCheckbox={this.state.displayRowCheckbox}>
		        {tableData.map( (row, index) => (
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

export default FuzzingTaskList;
