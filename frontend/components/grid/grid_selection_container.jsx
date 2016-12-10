import { connect } from 'react-redux';
import { getSelectionOffset, getSelectionDimensions, getWorkingArea, getCurSheet } from '../../reducers/selectors';
import { receiveStartCell } from '../../actions/sheet_actions';

import GridSelection from './grid_selection';

const mapStateToProps = (state) => {


  // if(state.doc 0) {
  //   return {
  //     offset: {},
  //     dimensions: {}
  //   };
  // }
  const workingArea = getWorkingArea(state);
  const sheet = getCurSheet(state);
  return {
    offset: getSelectionOffset(sheet),
    dimensions: getSelectionDimensions(workingArea.activeRange),
    directional: workingArea.directional,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    receiveStartCell: (cell, directional) => dispatch(receiveStartCell(cell,directional)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridSelection);
