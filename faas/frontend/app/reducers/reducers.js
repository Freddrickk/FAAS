import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import UI from './UI'

const reducers = combineReducers({
  UI,
  form: formReducer
});

export default reducers;
