import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';

import MainUI from './components/MainUI.jsx';
import reducers from './reducers/reducers';
import { fetchUsername, saveToken } from './actions/User';
import { fetchTaskList } from './actions/TasksList';

// creating store with reducers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk),
  ));

// must inject Tap Event plugin
injectTapEventPlugin();

// try to read the token in cookie
let token = Cookies.get('token');
if (typeof token != 'undefined') {
  store.dispatch(saveToken(token));
  store.dispatch(fetchUsername(token));
}

// list population
store.dispatch(fetchTaskList(token));



class App extends React.Component {
   render() {
      return (
        <MuiThemeProvider>
          <Provider store={store}>
            <MainUI />
          </Provider>
        </MuiThemeProvider>
      );
   }
}

export default App;
