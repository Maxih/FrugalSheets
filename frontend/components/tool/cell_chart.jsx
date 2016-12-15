import React from 'react';
import {merge} from 'lodash';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import {defaultChart, compare, mapChartData} from '../../utils/grid_utils';

export default class CellChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: null
    }

    this.chartId = `${props.cell.id}-chart`;
  }

  renderChart(chart) {
    if(this.refs[this.chartId] && chart) {
      if(this.state.chart)
        this.state.chart.destroy();

      const data = mapChartData(chart);
      const chartEl = this.refs[this.chartId].getContext('2d');
      let myChart = new Chart(chartEl, data);
      this.setState({chart: myChart});
    }
  }

  componentDidMount() {
    this.renderChart(this.props.chart);
  }

  componentWillReceiveProps(props) {
    if(!compare(this.props.chart, props.chart)) {
      this.renderChart(props.chart);
    }
  }

  componentWillUnmount() {
    this.state.chart.destroy();
  }

  render() {
    return (
      <canvas className="chart-canvas" ref={this.chartId} width="100%" height="100%"></canvas>
    );
  }
}
