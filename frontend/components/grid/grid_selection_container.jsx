import { connect } from 'react-redux';
import { getSelectionOffset, getSelectionDimensions, getWorkingArea, getCurSheet } from '../../reducers/selectors';
import { receiveStartCell, receiveEndCell } from '../../actions/sheet_actions';

import GridSelection from './grid_selection';

const mapStateToProps = (state) => {
  const workingArea = getWorkingArea(state);
  const sheet = getCurSheet(state);
  return {
    offset: getSelectionOffset(sheet.cells, workingArea.activeRange),
    dimensions: getSelectionDimensions(sheet.cells, workingArea.activeRange),
    directional: workingArea.directional,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    receiveStartCell: (cell, directional) => dispatch(receiveStartCell(cell,directional)),
    receiveEndCell: (cell) => dispatch(receiveEndCell(cell)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridSelection);
