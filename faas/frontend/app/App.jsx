import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import MainUI from './components/MainUI.jsx'
import reducers from './reducers/reducers'

// creating store with reducers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
  ));

// must inject Tap Event plugin
injectTapEventPlugin();

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
