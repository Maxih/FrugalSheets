import { connect } from 'react-redux';
import { updateCell } from '../../actions/sheet_actions';
import CellStyle from './cell_style';

const mapStateToProps = (state) => {
  const cell = state.doc.sheets[state.doc.activeSheet].workingArea.activeCell;

  return {
    activeCell: cell
  };
};

const mapDispatchToProps = dispatch => ({
  updateCell: (cell) => dispatch(updateCell(cell))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CellStyle);
