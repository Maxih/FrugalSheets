import React from 'react';
import * as Util from '../../utils/grid_utils';
import {merge} from 'lodash';

export default class GridSelection extends React.Component {
  constructor(props) {
    super(props);

    this.duplicateContent = this.duplicateContent.bind(this);
  }

  duplicateContent(e) {
    e.stopPropagation();
    this.props.receiveStartCell(null, true);
  }

  render() {
    const style = {
      top: this.props.offset.y,
      left: this.props.offset.x,
      width: this.props.dimensions.width,
      height: this.props.dimensions.height
    }

    if(style.width === 0 || style.height === 0)
      style.display = "none";

    let className = "selection";

    if(this.props.directional) {
      className = "selection directional";
    }

    return (
      <div style={style} className={className}>
        <div className="selection-body"></div>
        <div className="cell-val-expand" onMouseDown={this.duplicateContent}></div>
      </div>
    );
  }
}
