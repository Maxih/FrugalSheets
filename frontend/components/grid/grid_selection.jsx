import React from 'react';
import * as Util from '../../utils/grid_utils';
import {merge} from 'lodash';

export default class GridSelection extends React.Component {
  constructor(props) {
    super(props);

    this.duplicateContent = this.duplicateContent.bind(this);
    this.endSelection = this.endSelection.bind(this);
  }

  duplicateContent(e) {
    e.stopPropagation();
    this.props.receiveStartCell(null, true);
  }

  endSelection(e) {
    this.props.receiveEndCell(null);
  }

  render() {
    const style = {
      top: this.props.offset.y,
      left: this.props.offset.x,
      width: this.props.dimensions.width,
      height: this.props.dimensions.height
    }

    if(!style.width || !style.height) {
      style.display = "none";
    }

    let className = "selection active-selection";

    if(this.props.directional) {
      className += " directional";
    }

    return (
      <div style={style} className={className}>
        <div className="selection-body"></div>
        <div className="cell-val-expand" onMouseUp={this.endSelection} onMouseDown={this.duplicateContent}></div>
      </div>
    );
  }
}
