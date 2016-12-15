import { connect } from 'react-redux';
import { addChart, removeChart } from '../../../actions/sheet_actions';
import ChartButton from './chart_button';

const mapStateToProps = (state, ownProps) => {
  let chart = state.doc.sheets[state.doc.activeSheet].charts[ownProps.cell.id];
  return {
    chart: chart || false
  };
};

const mapDispatchToProps = dispatch => ({
  addChart: (cellId, chart) => dispatch(addChart(cellId, chart)),
  removeChart: (cellId) => dispatch(removeChart(cellId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartButton);
