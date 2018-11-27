/* eslint-disable */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createProductsAction } from '../../actions/GridActions';

import { Card } from 'reactstrap';
import {
  SortingState, EditingState, FilteringState, PagingState, GroupingState, RowDetailState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSorting, DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
  Grid, Table, TableHeaderRow, TableEditRow, TableEditColumn,
  TableFilterRow, TableGroupRow, ColumnChooser, TableColumnVisibility,
  GroupingPanel, PagingPanel, DragDropProvider, TableColumnReordering, TableColumnResizing, Toolbar,
} from '@devexpress/dx-react-grid-bootstrap4';

import CommandButton from '../../components/CommandButton';
import commandComponentProps from '../../constants/commandComponentProps';

const BooleanFormatter = ({ value }) => (
  <span className='badge badge-secondary'>
    {value ? 'Yes' : 'No'}
  </span>
);

const BooleanEditor = ({ value, onValueChange }) => (
  <select
    className='form-control'
    value={value}
    onChange={e => onValueChange(e.target.value === 'true')}
  >
    <option value={false}>
      No
    </option>
    <option value>
      Yes
    </option>
  </select>
);

const BooleanTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={BooleanFormatter}
    editorComponent={BooleanEditor}
    {...props}
  />
);

const getRowId = row => row.ProductID;

class ProductsContainer extends Component {
  render() {
    return (
      <div style={{ margin: 20 }}>
        <Card>
          <Grid
            rows={this.props.row.Products || []}
            columns={this.props.columns}
            getRowId={getRowId}
          >
            <FilteringState
              filters={this.props.filters}
              onFiltersChange={this.props.onFiltersChange}
            />
            <SortingState
              sorting={this.props.sorting}
              onSortingChange={this.props.onSortingChange}
            />
            <GroupingState
              grouping={this.props.grouping}
              onGroupingChange={this.props.onGroupingChange}
              expandedGroups={this.props.expandedGroups}
              onExpandedGroupsChange={this.props.onExpandedGroupsChange}
            />
            <PagingState
              currentPage={this.props.currentPage}
              onCurrentPageChange={this.props.onCurrentPageChange}
              pageSize={this.props.pageSize}
              onPageSizeChange={this.props.onPageSizeChange}
            />
            <RowDetailState
              expandedRowIds={this.props.expandedRowIds}
              onExpandedRowIdsChange={this.props.onExpandedRowIdsChange}
            />
            <BooleanTypeProvider
              for={[ 'IsBought' ]}
            />
            <EditingState
              onCommitChanges={(events) => this.props.onCommitChanges(events, this.props.rows, this.props.row.ListID)}
            />

            <IntegratedFiltering />
            <IntegratedSorting />
            <IntegratedGrouping />
            <IntegratedPaging />

            <DragDropProvider />

            <Table />

            <TableColumnResizing
              columnWidths={this.props.columnWidths}
              onColumnWidthsChange={this.props.onColumnWidthsChange}
            />
            <TableHeaderRow showSortingControls />
            <TableEditRow />
            <TableColumnVisibility />
            <TableEditColumn
              showAddCommand
              showEditCommand
              showDeleteCommand
              commandComponent={({ id, onExecute }) => (
                <CommandButton
                  {...commandComponentProps[id]}
                  onExecute={onExecute}
                />
              )}
            />
            <TableColumnReordering
              order={this.props.columnOrder}
              onOrderChange={this.props.onColumnOrderChange}
            />

            <TableFilterRow />
            <TableGroupRow />
            <Toolbar />
            <ColumnChooser />
            <GroupingPanel showSortingControls />
            <PagingPanel
              pageSizes={this.props.pageSizes}
            />
          </Grid>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.productsReducer,
    productsByList: state.productsByList,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    onSortingChange: sorting => createProductsAction('sorting', sorting),
    onExpandedRowIdsChange: expandedRowIds => createProductsAction('expandedRowIds', expandedRowIds),
    onGroupingChange: grouping => createProductsAction('grouping', grouping),
    onExpandedGroupsChange: expandedGroups => createProductsAction('expandedGroups', expandedGroups),
    onFiltersChange: filters => createProductsAction('filters', filters),
    onCurrentPageChange: currentPage => createProductsAction('currentPage', currentPage),
    onPageSizeChange: pageSize => createProductsAction('pageSize', pageSize),
    onColumnOrderChange: order => createProductsAction('columnOrder', order),
    onColumnWidthsChange: widths => createProductsAction('columnWidths', widths),
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductsContainer);

