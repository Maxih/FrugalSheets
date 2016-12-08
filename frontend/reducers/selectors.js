import {between} from '../utils/grid_utils';

export function selectedBorders(range, cell) {
  if(range === undefined)
    return {};

  if(range[0] === undefined)
    return {};

  const upperPos = range[0][0];
  const lowerPos = range[range.length-1][range[0].length-1];

  const borders = {};

  if(cell.pos.row === upperPos.pos.row) {
    borders.borderTop = "1px solid #4285f4";
  }
  if(cell.pos.row === lowerPos.pos.row) {
    borders.borderBottom = "1px solid #4285f4";
  }
  if(cell.pos.col === upperPos.pos.col) {
    borders.borderLeft = "1px solid #4285f4";
  }
  if(cell.pos.col === lowerPos.pos.col) {
    borders.borderRight = "1px solid #4285f4";
  }

  return borders;
}

export function isCellActive(selectedRange, cell) {
  if(selectedRange === undefined)
    return false;

  if(selectedRange[0] === undefined)
    return false;

  const activeCell = selectedRange[0][0];

  return activeCell.pos.row === cell.pos.row && activeCell.pos.col == cell.pos.col
}

export function isCellSelected(selectedRange, cell) {
  if(selectedRange === undefined)
    return false;

  if(selectedRange[0] === undefined)
    return false

  const startRow = selectedRange[0][0].pos.row;
  const endRow = startRow + selectedRange.length - 1;

  const startCol = selectedRange[0][0].pos.col;
  const endCol = startCol + selectedRange[0].length - 1;

  return between(cell.pos.row, startRow, endRow) && between(cell.pos.col, startCol, endCol);
}

export function isHeaderActive(range, ownProps) {
  if(range.length < 1 || range[0].length < 1)
    return false;

  if(ownProps.col) {
    let colRange = range[0][0].pos.col + range[0].length - 1

    if(between(ownProps.colId, range[0][0].pos.col, colRange))
      return true;
  } else {
    let rowRange = range[0][0].pos.row + range.length - 1

    if(between(ownProps.rowId, range[0][0].pos.row, rowRange))
      return true;
  }
  return false;
}

export function headerSize(grid, ownProps) {
  if(ownProps.col) {
    return grid[0][ownProps.colId].width;
  } else {
    return grid[ownProps.rowId][0].height;
  }
}
