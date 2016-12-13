import {connect} from 'react-redux';
import {
  receiveStartCell,
  receiveEndCell,
  tempEndCell,
  updateRangeGroups
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
  return {
    grid: state.doc.sheets[state.doc.activeSheet].data,
    activeSheet: state.doc.activeSheet,
    selecting: workingArea.selecting,
  };
};

const mapDispatchToProps = dispatch => ({
  receiveStartCell: (cell, directional) => dispatch(receiveStartCell(cell, directional)),
  receiveEndCell: (cell) => dispatch(receiveEndCell(cell)),
  updateRangeGroups: (groups) => dispatch(updateRangeGroups(groups)),
  tempEndCell: (cell) => dispatch(tempEndCell(cell)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
