import React from 'react';
import GridCellContainer from './grid_cell_container';
import {numToChar} from '../../utils/grid_utils';

export default class GridRow extends React.Component {
  render() {
    const cells = [];
    for(let i = 0; i < this.props.cols; i++) {
      const cellId = `${numToChar( i + 1 )}${ this.props.rowId }`
      cells.push(
        <GridCellContainer key={i} rowId={this.props.rowId} colId={numToChar( i + 1 )} id={cellId} />
      );
    }

    return (
      <span className="grid-row">
        {cells}
      </span>
    );
  }
}
