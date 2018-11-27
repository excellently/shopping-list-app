import 'bootstrap/dist/css/bootstrap.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header';
import HomePage from '../HomePage';
import ShoppingListsPage from '../ShoppingListsPage';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shopping-lists' component={ShoppingListsPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
