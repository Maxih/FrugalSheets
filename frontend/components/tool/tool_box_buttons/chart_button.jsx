import React from 'react';
import {defaultChart} from '../../../utils/grid_utils'

export default class ChartButton extends React.Component {
  constructor(props) {
    super(props);

    this.addChart = this.addChart.bind(this);
  }

  addChart() {
    const chartOptions = {
      dataRange: "",
      titleRange: "",
      chartType: "bar",
      name: "New Chart",
    }

    this.props.addChart(null, chartOptions);
  }

  render() {
    return (
      <ul className="style-group chart-dropdown-wrapper">
        <li
          className={`style-group-item style-type-chart`}
          onClick={this.addChart}>
        </li>
      </ul>
    );
  }
}
