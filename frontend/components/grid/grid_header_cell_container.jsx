import { connect } from 'react-redux';
import GridHeaderCell from './grid_header_cell';
import {resizeRow, resizeCol, selectRow, selectCol} from '../../actions/sheet_actions';
import { isHeaderActive, headerSize, getDataGrid, getActiveSheet, getWorkingArea } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {

  return {
    size: headerSize(getDataGrid(state), ownProps),
    activeSheet: getActiveSheet(state),
    active: isHeaderActive(getWorkingArea(state).activeRange, ownProps)
  };
};

const mapDispatchToProps = dispatch => ({
  resizeRow: (rowId, height) => dispatch(resizeRow(rowId, height)),
  resizeCol: (colId, width) => dispatch(resizeCol(colId, width)),
  selectRow: (rowId) => dispatch(selectRow(rowId)),
  selectCol: (colId) => dispatch(selectCol(colId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridHeaderCell);
