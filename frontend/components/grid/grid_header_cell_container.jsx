import { connect } from 'react-redux';
import GridHeaderCell from './grid_header_cell';
import {resizeRow, resizeCol, selectRow, selectCol} from '../../actions/sheet_actions';
import { isHeaderActive, headerSize, getCurSheet, getActiveSheet, getWorkingArea } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const workingArea = getWorkingArea(state);
  const curSheet = getCurSheet(state);
  let size;

  if(ownProps.col) {
    size = curSheet.colSizes[ownProps.cell.content] || 100
  } else {
    size = curSheet.rowSizes[ownProps.cell.content] || 26
  }

  return {
    // size: headerSize(getDataGrid(state), ownProps),
    activeSheet: getActiveSheet(state),
    active: isHeaderActive(workingArea.activeRange, ownProps),
    size: size
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
