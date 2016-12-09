import { connect } from 'react-redux';
import { updateCell } from '../../actions/sheet_actions';
import { getActiveCell } from '../../reducers/selectors';

import CellStyle from './cell_style';

const mapStateToProps = (state) => {
  return {
    activeCell: getActiveCell(state)
  };
};

const mapDispatchToProps = dispatch => ({
  updateCell: (cell) => dispatch(updateCell(cell))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CellStyle);
