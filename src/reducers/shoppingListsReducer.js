import Constants from '../constants/ActionTypes';
import gridInitialRows from '../data/shopping-lists';

export default function (state = gridInitialRows, action) {
  if (action.type === Constants.COMMIT_GRID_CHANGES_ACTION) {
    let { rows } = action;

    if (action.events.added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].ListID + 1 : 0;

      rows = [
        ...rows,
        ...action.events.added.map((row, index) => ({
          ListID: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (action.events.changed) {
      rows = rows.map(row => (action.events.changed[row.ListID] ? { ...row, ...action.events.changed[row.ListID] } : row));
    }
    if (action.events.deleted) {
      const deletedSet = new Set(action.events.deleted);

      rows = rows.filter(row => !deletedSet.has(row.ListID));
    }
    return rows;
  }

  if (action.type === Constants.COMMIT_PRODUCTS_CHANGES_ACTION) {
    const products = action.rows.map((item) => {
      if (item.ListID === action.listId) {
        if (action.events.added) {
          const startingAddedId = (item.Products && item.Products.length > 0)
            ? item.Products[item.Products.length - 1].ProductID + 1
            : 0;

          item.Products = item.Products ? [
            ...item.Products,
            ...action.events.added.map((row, index) => ({
              ProductID: startingAddedId + index,
              ...row,
            })),
          ] : [
            ...action.events.added.map((row, index) => ({
              ProductID: startingAddedId + index,
              ...row,
            })),
          ];
        }
        if (action.events.changed) {
          item.Products = item.Products.map(row => (action.events.changed[row.ProductID]
            ? { ...row, ...action.events.changed[row.ProductID] }
            : row));
        }
        if (action.events.deleted) {
          const deletedSet = new Set(action.events.deleted);

          item.Products = item.Products.filter(row => !deletedSet.has(row.ProductID));
        }
      }
      return item;
    });

    return products;
  }

  return state;
}
