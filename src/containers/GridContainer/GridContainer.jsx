/* eslint-disable */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createGridAction, commitGridChanges, commitProductChanges } from '../../actions/GridActions';

import { Card } from 'reactstrap';
import {
  SortingState, SelectionState, EditingState, FilteringState, PagingState, GroupingState, RowDetailState,
  IntegratedFiltering, IntegratedGrouping, IntegratedPaging, IntegratedSorting, IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
  Grid, Table, TableHeaderRow, TableEditRow, TableEditColumn,
  TableFilterRow, TableSelection, TableGroupRow, TableRowDetail,
  GroupingPanel, PagingPanel, DragDropProvider, TableColumnReordering, TableColumnResizing, Toolbar,
} from '@devexpress/dx-react-grid-bootstrap4';

import ProductsContainer from '../ProductsContainer';

import CommandButton from '../../components/CommandButton';
import commandComponentProps from '../../constants/commandComponentProps';

const getRowId = row => row.ListID;

class GridContainer extends Component {
  render() {
    return (
      <Card className='mt-4'>
        <Grid
          rows={this.props.rows}
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
          <EditingState
            onCommitChanges={(events) => this.props.onCommitChanges(events, this.props.rows)}
          />

          <IntegratedFiltering />
          <IntegratedSorting />
          <IntegratedPaging />

          <DragDropProvider />

          <Table />

          <TableColumnResizing
            columnWidths={this.props.columnWidths}
            onColumnWidthsChange={this.props.onColumnWidthsChange}
          />
          <TableHeaderRow showSortingControls />
          <TableEditRow />
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
          <TableRowDetail
            contentComponent={({ row }) => (
              <ProductsContainer onCommitChanges={this.props.onCommitProductChanges.bind(this)}
                row={row} rows={this.props.rows}
              />
            )}
          />
          <Toolbar />
          <PagingPanel
            pageSizes={this.props.pageSizes}
          />
        </Grid>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.gridReducer,
    rows: state.shoppingLists,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    onSortingChange: sorting => createGridAction('sorting', sorting),
    onExpandedRowIdsChange: expandedRowIds => createGridAction('expandedRowIds', expandedRowIds),
    onFiltersChange: filters => createGridAction('filters', filters),
    onCurrentPageChange: currentPage => createGridAction('currentPage', currentPage),
    onPageSizeChange: pageSize => createGridAction('pageSize', pageSize),
    onColumnOrderChange: order => createGridAction('columnOrder', order),
    onColumnWidthsChange: widths => createGridAction('columnWidths', widths),
    onCommitChanges: commitGridChanges,
    onCommitProductChanges: commitProductChanges,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(GridContainer);
