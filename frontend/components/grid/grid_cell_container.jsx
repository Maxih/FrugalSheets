import {connect} from 'react-redux';
import {
  updateCell,
  moveActiveCell,
  moveActiveRange,
} from '../../actions/sheet_actions';
import {
  getWorkingArea,
  getCell,
  parseFormula,
} from '../../reducers/selectors';

import GridCell from './grid_cell';

const mapStateToProps = (state, ownProps) => {
  const workingArea = getWorkingArea(state);
  const cell = getCell(state, ownProps.id);
  const sheet = state.doc.sheets[state.doc.activeSheet];
  const formula = state.doc.sheets[state.doc.activeSheet].formulas[ownProps.id];
  const content = (formula === undefined ? cell.content : parseFormula(state.doc.sheets[state.doc.activeSheet].cells, formula));
  let chart = state.doc.sheets[state.doc.activeSheet].charts[ownProps.id];

  return {
    cell: cell,
    active: (ownProps.id === workingArea.activeCell),
    content: content,
    width: sheet.colSizes[ownProps.colId] || 100,
    height: sheet.rowSizes[ownProps.rowId] || 26,
    chart: chart || false,
  };
};

const mapDispatchToProps = dispatch => ({
  updateCell: (cell) => dispatch(updateCell(cell)),

  // moveActiveCell: (delta) => dispatch(moveActiveCell(delta)),
  // moveActiveRange: (delta) => dispatch(moveActiveRange(delta)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridCell);
