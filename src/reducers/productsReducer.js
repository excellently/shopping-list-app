import Constants from '../constants/ActionTypes';

const gridInitialState = {
  sorting: [],
  grouping: [],
  expandedGroups: [],
  expandedRowIds: [],
  filters: [],
  currentPage: 0,
  pageSize: 5,
  pageSizes: [5, 10, 15],
  columns: [
    { name: 'IsBought', title: 'Куплено?' },
    { name: 'ProductName', title: 'Название товара' },
    { name: 'ShopName', title: 'Магазин' },
    { name: 'Category', title: 'Категория' },
    { name: 'Amount', title: 'Количество' },
    { name: 'Unit', title: 'Ед.' },
    { name: 'UnitPrice', title: 'Цена за ед.' },
    { name: 'Notes', title: 'Заметки' },
  ],
  columnOrder: ['ProductName', 'IsBought', 'ShopName', 'Category', 'Amount', 'Unit', 'UnitPrice', 'Notes'],
  columnWidths: [
    { columnName: 'ProductName', width: 200 },
    { columnName: 'IsBought', width: 100 },
    { columnName: 'ShopName', width: 200 },
    { columnName: 'Category', width: 200 },
    { columnName: 'Amount', width: 100 },
    { columnName: 'Unit', width: 100 },
    { columnName: 'UnitPrice', width: 100 },
    { columnName: 'Notes', width: 200 },
  ],
};

export default function (state = gridInitialState, action) {
  if (action.type === Constants.PRODUCTS_STATE_CHANGE_ACTION) {
    return {
      ...state,
      [action.partialStateName]: action.partialStateValue,
    };
  }
  return state;
}
