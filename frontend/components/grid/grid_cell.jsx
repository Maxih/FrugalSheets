import React from 'react';
import * as Util from '../../utils/grid_utils';
import {merge} from 'lodash';
import CellInputContainer from '../tool/cell_input_container';
import {Formula} from '../../utils/formula_util';


export default class GridCell extends React.Component {
  constructor(props) {
    super(props);

    // this.keyPress = this.keyPress.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    console.log("thinkin bout it");

    if(this.props.content != nextProps.content)
      return true;

    return (this.props.cell.shouldUpdate !== nextProps.cell.shouldUpdate) || this.props.active !== nextProps.active;
  }

  generateCellClass() {
    let className = "grid-cell unselectable";

    if(this.props.active)
      className += " active-cell";

    return className;
  }

  // keyPress(e) {
  //   e.stopPropagation();
  //
  //   switch(e.keyCode) {
  //     case 13: // enter
  //       e.preventDefault();
  //       if(e.shiftKey) // shift enter
  //         this.props.moveActiveCell({row: -1, col: 0});
  //       else
  //         this.props.moveActiveCell({row: 1, col: 0});
  //       break;
  //     case 9: // tab
  //       e.preventDefault();
  //       if(e.shiftKey)
  //         this.props.moveActiveCell({row: 0, col: -1});
  //       else
  //         this.props.moveActiveCell({row: 0, col: 1});
  //       break;
  //     case 37:
  //       e.preventDefault();
  //       if(e.shiftKey)
  //         this.props.moveActiveRange({row: 0, col: -1});
  //       else
  //         this.props.moveActiveCell({row: 0, col: -1});
  //       break;
  //     case 38:
  //       e.preventDefault();
  //       if(e.shiftKey)
  //         this.props.moveActiveRange({row: -1, col: 0});
  //       else
  //         this.props.moveActiveCell({row: -1, col: 0});
  //       break;
  //     case 39:
  //       e.preventDefault();
  //       if(e.shiftKey)
  //         this.props.moveActiveRange({row: 0, col: 1});
  //       else
  //         this.props.moveActiveCell({row: 0, col: 1});
  //       break;
  //     case 40:
  //       e.preventDefault();
  //       if(e.shiftKey)
  //         this.props.moveActiveRange({row: 1, col: 0});
  //       else
  //         this.props.moveActiveCell({row: 1, col: 0});
  //       break;
  //   }
  // }
            // keyPress={this.keyPress}
  render() {
    let content = this.props.content;

    if(this.props.active) {
      content = (
        <div
          className="active-cell-wrapper"
          >
          <CellInputContainer
            styling={true}
            refName="cellRef"
            cell={this.props.cell}
            resizeRow={this.props.resizeRow}
            updateCell={this.props.updateCell} />
        </div>
        );
    }

    return (
      <span
        className={this.generateCellClass()}
        id={this.props.id}
        tabIndex="1"
        style={this.props.cell.style}
        >
        {content}
      </span>
    );
  }
}
