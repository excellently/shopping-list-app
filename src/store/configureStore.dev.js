import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import DevTools from '../components/DevTools';

const logger = createLogger({ collapsed:true });

const finalCreateStore = compose(
  applyMiddleware(logger),
  DevTools.instrument()
)(createStore);

module.exports = function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
};
