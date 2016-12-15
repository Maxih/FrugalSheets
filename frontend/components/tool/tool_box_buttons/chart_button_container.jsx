import { connect } from 'react-redux';
import { addChart, removeChart } from '../../../actions/sheet_actions';
import ChartButton from './chart_button';

const mapStateToProps = (state, ownProps) => {
  let activeChart = state.doc.sheets[state.doc.activeSheet].activeChart;
  let chart = state.doc.sheets[state.doc.activeSheet].charts[activeChart];
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
