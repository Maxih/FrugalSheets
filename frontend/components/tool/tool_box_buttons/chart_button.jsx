import React from 'react';
import {defaultChart} from '../../../utils/grid_utils'

export default class ChartButton extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      dataRange: "",
      titleRange: "",
      chartType: "bar",
      name: "",
      displayOptions: false,
      hasChart: false
    }

    this.update = this.update.bind(this);
    this.addChart = this.addChart.bind(this);
    this.removeChart = this.removeChart.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
  }

  componentWillReceiveProps(props) {
    if(props.chart)
      this.setState({ hasChart: !!props.chart, dataRange: props.chart.dataRange, titleRange: props.chart.titleRange, chartType: props.chart.chartType, name: props.chart.name})
    else
      this.setState({ hasChart: false, dataRange: "", titleRange: "", chartType: "bar", name: ""})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  addChart() {
    const chartOptions = {
      dataRange: this.state.dataRange,
      titleRange: this.state.titleRange,
      chartType: this.state.chartType,
      name: this.state.name,
    }

    this.props.addChart(this.props.cell.id, chartOptions);
    this.setState({displayOptions: false});
  }

  removeChart() {
    this.props.removeChart(this.props.cell.id);
    this.setState({displayOptions: false});
  }

  toggleOptions() {
    this.setState({displayOptions: !this.state.displayOptions});
  }

  chartOptions() {
    let chartTypes = ["bar", "line", "pie"];

    chartTypes = chartTypes.map((type) => {
      return (
        <option key={type} value={type}>{type}</option>
      );
    })

    const addChartButton = (
      <li>
        <span className="chart-dropdown-submit" onClick={this.addChart}>Add Chart</span>
      </li>
    );

    const editChartButton = (
      <li>
        <span className="chart-dropdown-submit" onClick={this.addChart}>Update</span>
        <span className="chart-dropdown-submit chart-dropdown-delete" onClick={this.removeChart}>Remove</span>
      </li>
    )

    return (
      <div className="chart-dropdown">
        <ul>
          <li className="chart-dropdown-header">
            <span className="chart-dropdown-title">{"Name"}</span>
            <span className="chart-dropdown-input">
              <input type="text" value={this.state.name} onChange={this.update("name")} />
            </span>
          </li>
          <li>
            <span className="chart-dropdown-title">{"Data Range"}</span>
            <span className="chart-dropdown-input">
              <input type="text" value={this.state.dataRange} onChange={this.update("dataRange")} />
            </span>
          </li>
          <li>
            <span className="chart-dropdown-title">{"Title Range"}</span>
            <span className="chart-dropdown-input">
              <input type="text" value={this.state.titleRange} onChange={this.update("titleRange")} />
            </span>
          </li>
          <li>
            <span className="chart-dropdown-title">{"Type"}</span>
            <span className="chart-dropdown-input">
              <select value={this.state.chartType} onChange={this.update("chartType")}>
                {chartTypes}
              </select>
            </span>
          </li>
            { this.state.hasChart ? editChartButton : addChartButton }
        </ul>
      </div>
    );
  }

  render() {
    return (
      <ul className="style-group chart-dropdown-wrapper">
        <li
          className={`style-group-item style-type-chart${this.state.displayOptions ? " active-style" : ""}`}
          onClick={this.toggleOptions}>
        </li>
        {this.state.displayOptions ? this.chartOptions() : ""}
      </ul>
    );
  }
}
