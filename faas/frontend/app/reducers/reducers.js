import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import UI from './UI'
import Task from './Task'
import User from './User'
import TasksList from './TasksList'
import ReportsList from './ReportsList'

import FormsErrors from './FormsErrors'

const reducers = combineReducers({
  UI,
  User,
  Task,
  TasksList,
  ReportsList,
  FormsErrors,
  form: formReducer
});

export default reducers;
