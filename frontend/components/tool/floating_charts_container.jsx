import {connect} from 'react-redux';
import {
  moveChart,
  addChart,
  removeChart,
} from '../../actions/sheet_actions';
import {
  prepChartData,
} from '../../reducers/selectors';
import FloatingCharts from './floating_charts';

const mapStateToProps = (state, ownProps) => {

  return {
    charts: state.doc.sheets[state.doc.activeSheet].charts,
    cells: state.doc.sheets[state.doc.activeSheet].cells
  };
};

const mapDispatchToProps = dispatch => ({
  moveChart: (chartId, chart) => dispatch(moveChart(chartId, chart)),
  addChart: (chartId, chart) => dispatch(addChart(chartId, chart)),
  removeChart: (chartId) => dispatch(removeChart(chartId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FloatingCharts);
