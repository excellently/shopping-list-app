import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import DevTools from '../DevTools';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

const propTypes = {
  store: PropTypes.object,
};

class Root extends Component {
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <div>
          <App />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = propTypes;

module.exports = hot(module)(Root);
