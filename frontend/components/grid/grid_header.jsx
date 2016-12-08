import React from 'react';
import GridHeaderCellContainer from './grid_header_cell_container';

export default class GridHeader extends React.Component {
  render() {

    const cells = this.props.row.map((cell, idx) => {
      if(!this.props.col) {
        return (
          <GridHeaderCellContainer
            key={idx}
            col={true}
            colId={idx}
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
            rowId={idx}
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
