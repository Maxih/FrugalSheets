import React from 'react';
import {merge} from 'lodash';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import {defaultChart, compare, mapChartData} from '../../utils/grid_utils';
import FloatingChart from './floating_chart';
import {
  prepChartData,
} from '../../reducers/selectors';

export default class FloatingCharts extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const charts = Object.keys(this.props.charts).map((chart) => {
      const preppedChart = prepChartData(this.props.cells, this.props.charts[chart]);
      const offSetX = this.props.charts[chart].offSetX || 50;
      const offSetY = this.props.charts[chart].offSetY || 26;
      return (
        <FloatingChart
          key={chart}
          offSetX={offSetX}
          offSetY={offSetY}
          moveChart={this.props.moveChart}
          removeChart={this.props.removeChart}
          addChart={this.props.addChart}
          chart={preppedChart}
          stagedChart={this.props.charts[chart]}
          chartId={chart} />
      )
    });

    return (
      <div className="floating-chart-wrapper">
        {charts}
      </div>
    );
  }
}
