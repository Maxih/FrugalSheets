import React from 'react';
import GridCellContainer from './grid_cell_container';
import {numToChar} from '../../utils/grid_utils';

export default class GridRow extends React.Component {
  render() {
    const cells = this.props.row.map((cell, idx) => {
      return (
        <GridCellContainer id={`${numToChar(idx+1)}${this.props.rowId+1}`} key={idx} colId={idx} rowId={this.props.rowId} />
      );
    });

    return (
      <span className="grid-row">
        {cells}
      </span>
    );
  }
}
