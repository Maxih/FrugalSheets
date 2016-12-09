import { connect } from 'react-redux';
import { receiveStartCell, receiveEndCell, tempEndCell, updateCell } from '../../actions/sheet_actions';
import { isCellActive, isCellSelected, getWorkingArea, getCell, getDataGrid } from '../../reducers/selectors';
import GridCell from './grid_cell';

const mapStateToProps = (state, ownProps) => {
  const workingArea = getWorkingArea(state);
  const cell = getCell(state, ownProps.rowId, ownProps.colId);

  return {
    selected: isCellSelected(workingArea.activeRange, cell),
    active: isCellActive(workingArea.activeRange, cell),
    selecting: workingArea.selecting,
    cell: cell,
    grid: getDataGrid(state)
  };
};

const mapDispatchToProps = dispatch => ({
  receiveStartCell: (cell) => dispatch(receiveStartCell(cell)),
  receiveEndCell: (cell) => dispatch(receiveEndCell(cell)),
  tempEndCell: (cell) => dispatch(tempEndCell(cell)),
  updateCell: (cell) => dispatch(updateCell(cell)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridCell);
