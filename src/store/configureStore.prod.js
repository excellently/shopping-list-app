import { createStore, compose } from 'redux';
import rootReducer from '../reducers';

const finalCreateStore = compose()(createStore);

module.exports = function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
