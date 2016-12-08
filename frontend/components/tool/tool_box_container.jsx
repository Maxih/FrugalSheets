import { connect } from 'react-redux';
import { updateCell, updateRange } from '../../actions/sheet_actions';
import ToolBox from './tool_box';

const mapStateToProps = (state) => {
  const cell = state.doc.sheets[state.doc.activeSheet].workingArea.activeCell;

  return {
    activeCell: cell
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
