import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { connect } from 'react-redux';



// ================ this part is use to do an asynchronous call to the REST API in order to get the fuzzing task list from the connected user
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';

const initialState = {
	fetching: false,
	fetched: false,
	fuzzingTaskList: [],
	error: null
}

const reducer = (state=initialState, action) => {
	switch(action.type){
		case "FETCH_FUZZING_TASKS": {
			return{...state, fetching: true}
			break;
		}

		case "RECEIVE_FUZZING_TASKS": {
			return{...state, fetching: false, fetched:true, fuzzingTaskList: action.payload}
			break;
		}

		case "FETCH_FUZZING_TASKS_ERROR": {
			return{...state, fetching: false, error: action.payload}
			break;
		}

	}
	return state
}
const middleware = applyMiddleware(thunk, logger())
const store = createStore(reducer, middleware)
store.dispatch((dispatch) => {
	dispatch({type: "FETCH_FUZZING_TASKS"})
	let token = Cookies.get('token');
   let headers = new Headers({
     'Content-Type': 'application/json',
     'Authorization': 'Token ' + token
   });

	fetch('/api/task/', {     
	headers: headers,
     method: 'get'})
	.then((response) => {
		dispatch({type: "RECEIVE_FUZZING_TASKS", payload: response.data})
	})
	.catch((err) => {
		dispatch({type: "FETCH_FUZZING_TASKS_ERROR"}, payload: err)
	})
	//do something async
	dispatch({type: "BAR"})
})
// ================




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
		        {initialState.fuzzingTaskList.map( (row, index) => (
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