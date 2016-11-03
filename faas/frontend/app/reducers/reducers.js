import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import UI from './UI'
import Task from './Task'
import User from './User'

import FormsErrors from './FormsErrors'

const reducers = combineReducers({
  UI,
  User,
  Task,
  FormsErrors,
  form: formReducer
});

export default reducers;
