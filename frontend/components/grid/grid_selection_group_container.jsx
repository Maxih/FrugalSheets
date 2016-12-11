import { connect } from 'react-redux';
import { getSelectionOffset, getSelectionDimensions, getCurSheet } from '../../reducers/selectors';
import { receiveStartCell, receiveEndCell } from '../../actions/sheet_actions';

import GridSelectionGroup from './grid_selection_group';

const mapStateToProps = (state) => {
  const sheet = getCurSheet(state);
  const groups = sheet.rangeGroups.map((range) => {
    return {
      offset: getSelectionOffset(sheet.data, range),
      dimensions: getSelectionDimensions(sheet.data, range),
    }
  });

  return {
    groups: groups
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
)(GridSelectionGroup);
