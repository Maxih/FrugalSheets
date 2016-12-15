import React from 'react';
import {merge} from 'lodash';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';
import {defaultChart, compare, mapChartData} from '../../utils/grid_utils';

export default class FloatingChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: null,
      showOptions: false,
      dataRange: props.stagedChart.dataRange,
      titleRange: props.stagedChart.titleRange,
      chartType:  props.stagedChart.chartType,
      name:  props.stagedChart.name,
    }

    this.update = this.update.bind(this);
    this.chartDrag = this.chartDrag.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.hideOptions = this.hideOptions.bind(this);
    this.addChart = this.addChart.bind(this);
    this.removeChart = this.removeChart.bind(this);
  }

  renderChart(chart) {
    if(this.refs[this.props.chartId] && chart) {
      if(this.state.chart)
        this.state.chart.destroy();

      const data = mapChartData(chart);
      const chartEl = this.refs[this.props.chartId].getContext('2d');
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

  chartDrag(e) {
    const offsetY = $(".grid-wrapper").scrollTop();
    const offsetX = $(".grid-wrapper").scrollLeft();
    const offsetWindow = $(".grid-wrapper").offset();

    const left = e.clientX - offsetWindow.left - e.target.parentElement.clientWidth + offsetX
    const top = e.clientY - offsetWindow.top - e.target.parentElement.clientHeight + offsetY;


    if(left > 0) {
      if(left > 50)
        e.target.parentElement.style.left = `${left}px`;
      else
        e.target.parentElement.style.left = `50px`;
    }


    if(top > 0) {
      if(top > 26)
        e.target.parentElement.style.top = `${top}px`;
      else
        e.target.parentElement.style.top = `26px`;
    }
  }

  addChart() {
    const chartOptions = {
      dataRange: this.state.dataRange,
      titleRange: this.state.titleRange,
      chartType: this.state.chartType,
      name: this.state.name,
    }

    this.props.addChart(this.props.chartId, chartOptions);
  }

  removeChart() {
    this.props.removeChart(this.props.chartId);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }


  dragStart(e) {
    let dragIcon = document.createElement('img');
    dragIcon.src = '';
    dragIcon.width = 0;
    dragIcon.style.opacity = 0;
    e.dataTransfer.setDragImage(dragIcon, 0,0);
  }

  dragEnd(e) {
    this.props.moveChart(this.props.chartId, {offSetX: e.target.parentElement.style.left, offSetY: e.target.parentElement.style.top})
  }


  showOptions(e) {
    this.setState({showOptions: true});
  }

  hideOptions(e) {
    this.setState({showOptions: false});
  }

  render() {
    let chartTypes = ["bar", "line", "pie"];

    chartTypes = chartTypes.map((type) => {
      return (
        <option key={type} value={type}>{type}</option>
      );
    })

    const style = {
      top: this.props.offSetY,
      left: this.props.offSetX
    }

    const options = (
      <div className="chart-options">
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
          <li>
            <span className="chart-dropdown-submit" onClick={this.addChart}>Update</span>
            <span className="chart-dropdown-submit chart-dropdown-delete" onClick={this.removeChart}>X</span>
          </li>
        </ul>
      </div>
    )

    return (
      <div onMouseLeave={this.hideOptions} onClick={this.showOptions} className="floating-chart" style={style}>
        {this.state.showOptions ? options : ""}
        <canvas className="chart-canvas" ref={this.props.chartId} width="100%" height="100%"></canvas>
        <span draggable="true" onDrag={this.chartDrag} onDragStart={this.dragStart} onDragEnd={this.dragEnd} className="chart-drag"></span>
      </div>
    );
  }
}
