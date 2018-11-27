import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './components/Root';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import { configureStore } from './store';
const store = configureStore();


ReactDOM.render(
  <Router history={browserHistory}>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
);
