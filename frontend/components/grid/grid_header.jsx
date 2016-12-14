import React from 'react';
import GridHeaderCellContainer from './grid_header_cell_container';
import {
  numToChar,
} from '../../utils/grid_utils';

export default class GridHeader extends React.Component {
  render() {

    const cells = this.props.row.map((cell, idx) => {
      if(!this.props.col) {
        return (
          <GridHeaderCellContainer
            key={idx}
            col={true}
            colId={numToChar(idx+1)}
            rowId=""
            cell={cell}
            />
        );
      } else {
        return (
          <GridHeaderCellContainer
            key={idx}
            col={false}
            colId=""
            rowId={idx+1}
            cell={cell}
            />
        );
      }
    });

    return (
      <span className="grid-row">
        {cells}
      </span>
    );
  }
}
