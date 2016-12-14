import React from 'react';
import * as Util from '../../utils/grid_utils';



export default class GridHeaderCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: props.size
    }

    this.headerResize = this.headerResize.bind(this);
    this.resizeEnd = this.resizeEnd.bind(this);
    this.selectCells = this.selectCells.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({size: props.size});
  }

  headerResize(e) {
    const offset = $(e.target.parentElement).offset();

    if(this.props.col) {
      let width = e.clientX - offset.left;

      if(width > 0) {
        if(width < 25)
          width = 25;

        this.setState({size: width});
        e.target.parentElement.style.width = width;
      }
    } else {
      let height = e.clientY - offset.top;

      if(height > 0) {
        if(height < 26)
          height = 26;

        this.setState({size: height});
        e.target.parentElement.style.height = height;
      }
    }
  }

  resizeEnd() {
    const {rowId, colId, resizeCol, resizeRow} = this.props;
    if(this.props.col) {
      resizeCol(colId, this.state.size);
    } else {
      resizeRow(rowId, this.state.size);
    }
  }



  generateCellClass() {
    let className = "grid-cell unselectable";

    if(this.props.active)
      className += " selected-cell";

    return className;
  }

  selectCells() {
    const {rowId, colId, selectCol, selectRow} = this.props;
    if(this.props.col) {
      selectCol(colId);
    } else {
      selectRow(rowId);
    }
  }

  render() {
    const style = {};

    if(this.props.col) {
      style.width = this.state.size;
    } else {
      style.height = this.state.size;
    }

    return (
      <span
        className={this.generateCellClass()}
        style={style}
        onClick={this.selectCells}
        >
        {this.props.cell.content}
        <span draggable="true" onDrag={this.headerResize} onDragEnd={this.resizeEnd} className="resizer"></span>
      </span>
    );
  }
}
