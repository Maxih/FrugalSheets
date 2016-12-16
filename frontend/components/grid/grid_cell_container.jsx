import {connect} from 'react-redux';
import {
  updateCell,

} from '../../actions/sheet_actions';
import {
  getWorkingArea,
  getCell,
  parseFormula,
  getActiveSheet,
} from '../../reducers/selectors';

import GridCell from './grid_cell';

const mapStateToProps = (state, ownProps) => {
  const workingArea = getWorkingArea(state);
  const cell = state.doc.sheets[getActiveSheet(state)].cells[ownProps.id];
  const sheet = state.doc.sheets[state.doc.activeSheet];

  let content = "";
  if(cell) {
    const formula = state.doc.sheets[state.doc.activeSheet].formulas[ownProps.id];
    content = (formula === undefined ? cell.content : parseFormula(state.doc.sheets[state.doc.activeSheet].cells, formula));
  }

  let chart = state.doc.sheets[state.doc.activeSheet].charts[ownProps.id];

  return {
    cell: cell || false,
    active: (ownProps.id === workingArea.activeCell),
    content: content,
    width: sheet.colSizes[ownProps.colId] || 100,
    height: sheet.rowSizes[ownProps.rowId] || 26,
    chart: chart || false,
  };
};

const mapDispatchToProps = dispatch => ({
  updateCell: (cell) => dispatch(updateCell(cell)),

});

export default connect(mapStateToProps, mapDispatchToProps)(GridCell);
