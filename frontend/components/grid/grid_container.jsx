import {connect} from 'react-redux';
import {
  receiveStartCell,
  receiveEndCell,
  tempEndCell,
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

import Grid from './grid';

const mapStateToProps = (state) => {
  const workingArea = getWorkingArea(state);
  const sheet = state.doc.sheets[state.doc.activeSheet];

  return {
    activeSheet: state.doc.activeSheet,
    selecting: workingArea.selecting,
    rows: sheet.rows,
    cols: sheet.cols,
    rowSizes: sheet.rowSizes,
    colSizes: sheet.colSizes,
    cells: sheet.cells,
    charts: sheet.charts,
  };
};

const mapDispatchToProps = dispatch => ({
  receiveStartCell: (cell, directional) => dispatch(receiveStartCell(cell, directional)),
  receiveEndCell: (cell) => dispatch(receiveEndCell(cell)),
  updateRangeGroups: (groups) => dispatch(updateRangeGroups(groups)),
  tempEndCell: (cell) => dispatch(tempEndCell(cell)),
  moveActiveCell: (delta) => dispatch(moveActiveCell(delta)),
  moveActiveRange: (delta) => dispatch(moveActiveRange(delta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
