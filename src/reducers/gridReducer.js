import Constants from '../constants/ActionTypes';

const gridInitialState = {
  sorting: [],
  expandedRowIds: [ 0 ],
  filters: [],
  currentPage: 0,
  pageSize: 10,
  pageSizes: [5, 10, 15],
  columns: [
    { name: 'ListName', title: 'Название списка' },
    { name: 'CreatedOn', title: 'Дата составления' },
  ],
  columnOrder: ['ListName', 'CreatedOn'],
  columnWidths: [
    { columnName: 'ListName', width: 400 },
    { columnName: 'CreatedOn', width: 400 },
  ],
};

export default function (state = gridInitialState, action) {
  if (action.type === Constants.GRID_STATE_CHANGE_ACTION) {
    return {
      ...state,
      [action.partialStateName]: action.partialStateValue,
    };
  }
  return state;
}
