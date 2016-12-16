import React from 'react';
import * as Util from '../../utils/grid_utils';
import {merge} from 'lodash';
import CellInputContainer from '../tool/cell_input_container';
import {Formula} from '../../utils/formula_util';


export default class GridCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cell: props.cell || Util.blankCell(props.id)
    }

  }

  componentWillReceiveProps(props) {
    this.setState({cell: props.cell || Util.blankCell(props.id)});
  }

  shouldComponentUpdate(nextProps) {

    if(this.props.content != nextProps.content)
      return true;

    if(this.props.width !== nextProps.width || this.props.height !== nextProps.height)
      return true;

    return (this.props.cell.shouldUpdate !== nextProps.cell.shouldUpdate) || this.props.active !== nextProps.active;
  }

  generateCellClass() {
    let className = "grid-cell unselectable";

    if(this.props.active)
      className += " active-cell";

    return className;
  }

  render() {
    let content = this.props.content;

    let style = merge({}, this.state.cell.style, {height: this.props.height, width: this.props.width});


    if(this.props.active) {
      content = (
        <div

          className="active-cell-wrapper"
          >
          <CellInputContainer
            styling={true}
            refName="cellRef"
            cell={this.state.cell}
            resizeRow={this.props.resizeRow}
            updateCell={this.props.updateCell} />
        </div>
        );
    }




    return (
      <span
        className={this.generateCellClass()}
        id={this.props.id}

        style={style}
        >
        {content}
      </span>
    );
  }
}
