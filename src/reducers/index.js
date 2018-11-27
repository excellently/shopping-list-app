import { combineReducers } from 'redux';
import shoppingLists from './shoppingListsReducer';
import gridReducer from './gridReducer';
import productsReducer from './productsReducer';


const allReducers = combineReducers({
  shoppingLists,
  gridReducer,
  productsReducer,
});

export default allReducers;
