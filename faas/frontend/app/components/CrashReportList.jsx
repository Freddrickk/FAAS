import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const paperStyle = {
  margin: 0,
  padding: 20,
  textAlign: 'center',
};

const tableData = [
  {
    name: 'crash 1',
    owner: 'Ben',
	description: 'crash crash',
  },
  {
    name: 'crash 2',
    owner: 'Martin',
	description: 'fuzzing fuzzing',
  },
  {
    name: 'crash 3',
    owner: 'Martin',
	description: 'fuzzing fuzzing',
  },
  {
    name: 'crash4',
    owner: 'Ben',
	description: 'fuzzing fuzzing',
  },
  {
    name: 'crash 5',
    owner: 'Fred',
	description: 'fuzzing fuzzing',
  },
  {
    name: 'crash 6',
    owner: 'Fred',
	description: 'fuzzing fuzzing',
  },
  {
    name: 'crash 7',
    owner: 'Fred',
	description: 'fuzzing fuzzing',
  },
];

class CrashReportList extends Component {

  render() {
    return (
      <div>
        <Paper style={paperStyle}>
          <Table>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn colSpan="3" tooltip="Crash Report List" style={{textAlign: 'center'}}>
                  Crash Report List
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Owner</TableHeaderColumn>
                <TableHeaderColumn>Description</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {[].map( (row, index) => (
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

export default CrashReportList;
