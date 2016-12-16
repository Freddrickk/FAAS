import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { openCrashReportModal, closeCrashReportModal } from '../actions/UI';
import { fetchCrashReportDetail, fetchRegistersDetail } from '../actions/ReportsList';

const paperStyle = {
  margin: 0,
  padding: 20,
  textAlign: 'center',
};

class CrashReportDialogModal extends React.Component {

  constructor () {
    super();
    this.renderCrashReportDetail = this.renderCrashReportDetail.bind(this);
    this.renderRegisters = this.renderRegisters.bind(this);
    this.renderPayload = this.renderPayload.bind(this);
  }

  static mapStateToProps(state) {
    return {
      crashReportModalIsOpen: () => state.UI.crashReportModalIsOpen,
      getCurrentCrashReport: () => state.ReportsList.currentCrashReport,
      getCurrentRegisters: () => state.ReportsList.currentRegisters
    }
  }

  static mapDispatchToProps(dispatch){
    return{
      closeCrashReportModal: () => dispatch(closeCrashReportModal())
    }
  }

  renderRegisters() {
    let reg =  Object.assign({}, this.props.getCurrentRegisters());
    delete reg['crash_id'];
    let keys = Object.keys(reg);
    return (
      <div>
        {keys.map((row, index) => (
          <div>
            <span>{row} => {reg[row]}</span>
          </div>
        ))}
      </div>
    )
  }

  renderPayload(length) {
    let unFormated = atob(this.props.getCurrentCrashReport().payload)
    var formated = ""
    for (var i = 0; i < unFormated.length; i += length) {
      var outer = i + length;
      if (outer > unFormated.length)
        outer = unFormated.length;
      formated = formated + unFormated.substring(i, outer) + '\n'
    }

    return formated;
  }

  renderCrashReportDetail(){
    var currentCrashReport = this.props.getCurrentCrashReport();
    if(currentCrashReport){
      return (<div>
        SIGNAL : {currentCrashReport.signal} <br/> <br/>
        TASK : {currentCrashReport.task} <br/> <br/>
        REGISTERS : {this.renderRegisters()} <br/> <br/>
        PAYLOAD : <br />{this.renderPayload(20)}<br/> <br/>
      </div>);
    }
    return "";
  }


  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.props.closeCrashReportModal}
      />
    ];

    return (
      <div>
        <Dialog
          title="Crash Report Details"
          actions={actions}
          modal={true}
          autoScrollBodyContent={true}
          contentStyle={{color: "red"}}
          open={this.props.crashReportModalIsOpen()}
        >
          {this.renderCrashReportDetail()}
        </Dialog>
      </div>
    );
  }
}

var ConnectedModal = connect(CrashReportDialogModal.mapStateToProps, CrashReportDialogModal.mapDispatchToProps)(CrashReportDialogModal)

class CrashReportList extends Component {

    constructor() {
    super();
    this.handleOnClickRow = this.handleOnClickRow.bind(this);
  }

  static mapStateToProps(state) {
    return {
      getToken: () => state.User.credentials.token,
      getReports: () => state.ReportsList.ReportsList,
      getRegisters: () => state.ReportsList.currentRegisters,
      getCrashReportInformation: (indexCrashReport) => state.ReportsList.ReportsList[indexCrashReport]
    }
  }

  static mapDispatchToProps(dispatch) {
    return{
      openCrashReportModal: () => dispatch(openCrashReportModal()),
      fetchCrashReportDetail : (token, idCrashReport) => dispatch(fetchCrashReportDetail(token, idCrashReport)),
      fetchRegisters : (token, idCrashReport) => dispatch(fetchRegistersDetail(token, idCrashReport))
    }
  }

  handleOnClickRow = (indexRow) => {
    var oCrashReport = this.props.getCrashReportInformation(indexRow);
    if(oCrashReport){
      var idCrashReport = oCrashReport.id;
      this.props.fetchCrashReportDetail(this.props.getToken(), idCrashReport);
      this.props.fetchRegisters(this.props.getToken(), idCrashReport);
      this.props.openCrashReportModal();
    }
  }


  render() {
    return (
      <div>
        <Paper style={paperStyle}>
          <Table onRowSelection={this.handleOnClickRow}>
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
        <ConnectedModal />
      </div>
    );
  }
}

export default connect(CrashReportList.mapStateToProps, CrashReportList.mapDispatchToProps)(CrashReportList);
