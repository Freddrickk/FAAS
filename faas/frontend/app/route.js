import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App.jsx';
import Login from './Login.jsx';

export default(
	<Route path="/" component={App}>
		<IndexRoute component={Greetings} />
		<Route path="login" component={Login} />
	</Route>
)
