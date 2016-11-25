import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const paperStyle = {
  margin: 0,
  padding: 20,
  textAlign: 'center',
};

class CrashReportList extends Component {

  static mapStateToProps(state) {
    return {
      getReports: () => state.ReportsList.ReportsList
    }
  }

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
                <TableHeaderColumn>Task Name</TableHeaderColumn>
                <TableHeaderColumn>Owner</TableHeaderColumn>
                <TableHeaderColumn>Signal</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.getReports().map( (row, index) => (
                <TableRow key={index} selected={row.selected}>
                  <TableRowColumn>{row.task_name}</TableRowColumn>
                  <TableRowColumn>{row.owner}</TableRowColumn>
                  <TableRowColumn>{row.signal}</TableRowColumn>
                </TableRow>
		          ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default connect(CrashReportList.mapStateToProps)(CrashReportList);
