import {connect} from 'react-redux';
import {
} from '../../actions/sheet_actions';
import {
  prepChartData,
} from '../../reducers/selectors';
import CellChart from './cell_chart';

const mapStateToProps = (state, ownProps) => {
  let chart = state.doc.sheets[state.doc.activeSheet].charts[ownProps.cell.id];

  if(chart) {
    chart = prepChartData(state.doc.sheets[state.doc.activeSheet].cells, chart);
  }

  return {
    chart: chart || false,
  };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CellChart);
