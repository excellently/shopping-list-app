import Constants from '../constants/ActionTypes';

export function createGridAction(partialStateName, partialStateValue) {
  return {
    type: Constants.GRID_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
  };
}

export function commitGridChanges(events, rows) {
  return {
    type: Constants.COMMIT_GRID_CHANGES_ACTION,
    events,
    rows,
  };
}

export function commitProductChanges(events, rows, listId) {
  return {
    type: Constants.COMMIT_PRODUCTS_CHANGES_ACTION,
    events,
    rows,
    listId,
  };
}

export function createProductsAction(partialStateName, partialStateValue) {
  return {
    type: Constants.PRODUCTS_STATE_CHANGE_ACTION,
    partialStateName,
    partialStateValue,
  };
}
