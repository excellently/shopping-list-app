import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from '../App';

const propTypes = {
  store: PropTypes.object,
};

class Root extends Component {
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

Root.propTypes = propTypes;

module.exports = Root;
