import {connect} from 'react-redux';
import {
  resizeRow,
  receiveStartCell,
  receiveEndCell,
  tempEndCell,
  updateCell,
  updateRangeGroups,
  moveActiveCell,
  moveActiveRange,
} from '../../actions/sheet_actions';
import {
  isCellActive,
  isCellSelected,
  getWorkingArea,
  getCell,
  getDataGrid,
  getActiveSheet
} from '../../reducers/selectors';
import GridCell from './grid_cell';

const mapStateToProps = (state, ownProps) => {
  const workingArea = getWorkingArea(state);
  const cell = getCell(state, ownProps.rowId, ownProps.colId);

  return {
    active: isCellActive(workingArea.activeRange, cell),
    selecting: workingArea.selecting,
    cell: cell,
    // grid: getDataGrid(state)
  };
};

const mapDispatchToProps = dispatch => ({
  updateCell: (cell) => dispatch(updateCell(cell)),
  resizeRow: (rowId, height) => dispatch(resizeRow(rowId, height)),
  moveActiveCell: (delta) => dispatch(moveActiveCell(delta)),
  moveActiveRange: (delta) => dispatch(moveActiveRange(delta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridCell);
