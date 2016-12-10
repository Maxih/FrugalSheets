import {
  between
} from '../utils/grid_utils';

export function getSelectionOffset(sheet) {
  if (sheet.workingArea.activeRange[0] === undefined)
    return {};

  const dims = sheet.workingArea.activeRange[0][0].pos;
  const grid = sheet.data;

  let totalWidth = 50;
  let totalHeight = 26;

  if (grid[0] !== undefined) {
    for (let i = 0; i < dims.row; i++) {
      totalHeight += grid[i][0].height;
    }

    for (let j = 0; j < dims.col; j++) {
      totalWidth += grid[0][j].width;
    }
  }

  const style = {
    x: totalWidth,
    y: totalHeight
  }

  return style;
}

export function getSelectionDimensions(range) {
  let totalWidth = 0;
  let totalHeight = 0;

  if (range[0] !== undefined) {
    for (let i = 0; i < range.length; i++) {
      totalHeight += range[i][0].height;
    }

    for (let j = 0; j < range[0].length; j++) {
      totalWidth += range[0][j].width;
    }
  }

  const style = {
    width: totalWidth,
    height: totalHeight
  }

  return style;
}

export function getDataGrid(state) {
  return state.doc.sheets[getActiveSheet(state)].data;
}

export function getWorkingArea(state) {
  return state.doc.sheets[getActiveSheet(state)].workingArea;
}

export function getCell(state, row, col) {
  return state.doc.sheets[getActiveSheet(state)].data[row][col];
}

export function getActiveSheet(state) {
  return state.doc.activeSheet;
}

export function getCurSheet(state) {
  return state.doc.sheets[getActiveSheet(state)];
}

export function getActiveCell(state) {
  return state.doc.sheets[getActiveSheet(state)].workingArea.activeCell;
}

export function applySearchParam(docs, searchParam) {
  if (docs === undefined)
    return [];

  if (searchParam === "")
    return docs;

  return docs.filter((doc) => {
    return doc.name.toLowerCase().indexOf(searchParam.toLowerCase()) != -1;
  });
}

export function isCellActive(selectedRange, cell) {
  if (selectedRange === undefined)
    return false;

  if (selectedRange[0] === undefined)
    return false;

  const activeCell = selectedRange[0][0];

  return activeCell.pos.row === cell.pos.row && activeCell.pos.col == cell.pos.col
}

export function isCellSelected(selectedRange, cell) {
  if (selectedRange === undefined)
    return false;

  if (selectedRange[0] === undefined)
    return false

  const startRow = selectedRange[0][0].pos.row;
  const endRow = startRow + selectedRange.length - 1;

  const startCol = selectedRange[0][0].pos.col;
  const endCol = startCol + selectedRange[0].length - 1;

  return between(cell.pos.row, startRow, endRow) && between(cell.pos.col, startCol, endCol);
}

export function isHeaderActive(range, ownProps) {
  if (range.length < 1 || range[0].length < 1)
    return false;

  if (ownProps.col) {
    let colRange = range[0][0].pos.col + range[0].length - 1

    if (between(ownProps.colId, range[0][0].pos.col, colRange))
      return true;
  } else {
    let rowRange = range[0][0].pos.row + range.length - 1

    if (between(ownProps.rowId, range[0][0].pos.row, rowRange))
      return true;
  }
  return false;
}

export function headerSize(grid, ownProps) {
  if (ownProps.col) {
    return grid[0][ownProps.colId].width;
  } else {
    return grid[ownProps.rowId][0].height;
  }
}
