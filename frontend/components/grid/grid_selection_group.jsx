import React from 'react';
import * as Util from '../../utils/grid_utils';
import {merge} from 'lodash';

export default class GridSelectionGroup extends React.Component {
  constructor(props) {
    super(props);

    this.colors = Util.darkerPalette();
  }

  render() {
    const showGroups = this.props.groups.map((group, idx) => {
      const style = {
        top: group.offset.y,
        left: group.offset.x,
        width: group.dimensions.width,
        height: group.dimensions.height,
        borderColor: this.colors[idx],
      }

      let className = "selection range-selection";

      return (
        <div key={idx} style={style} className={className}>
          <div style={{backgroundColor: this.colors[idx]}} className="selection-body"></div>
        </div>
      );
    });

    return (
      <div className="groups">
          {showGroups}
      </div>
    )
  }
}
