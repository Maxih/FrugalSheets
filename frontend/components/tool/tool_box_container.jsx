import { connect } from 'react-redux';
import { updateCell, updateRange } from '../../actions/sheet_actions';
import { getActiveCell } from '../../reducers/selectors';
import ToolBox from './tool_box';

const mapStateToProps = (state) => {
  return {
    activeCell: getActiveCell(state)
  };
};

const mapDispatchToProps = dispatch => ({
  updateCell: (cell) => dispatch(updateCell(cell)),
  updateRange: (cell) => dispatch(updateRange(cell))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolBox);
