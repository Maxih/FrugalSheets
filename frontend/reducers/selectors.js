import {
  between,
  parseCoord,
  numToChar,
  charToNum,
  getFormulaRange
} from '../utils/grid_utils';

import {
  Formula
} from '../utils/formula_util';


export function parseFormula(cells, text) {
  let parsed = text;
  const formula = new Formula(text.slice(1));
  const vars = Object.keys(formula.vars);
  const mappedVar = {};

  vars.forEach((curVar) => {
    let coords = getFormulaRange(cells, curVar);

    let varMap = {};

    coords.forEach((coord) => {
      let cur = cells[coord].content;

      if(cur[0] === "=")
        cur = parseFormula(cells, cur);

      varMap[coord] = cur;
    });

    mappedVar[curVar] = varMap;
  });

  parsed = formula.parse(mappedVar);

  return parsed;
}

export function getSelectionOffset(cells, range) {
  if (range === undefined || cells === undefined)
    return {};

  const coords = parseCoord(range);

  if(!coords)
    return {};

  let offSetX = 50;
  let offSetY = 26;

  let lowerBoundsCol = coords.start.col < coords.end.col ? coords.start.col : coords.end.col;
  let lowerBoundsRow = coords.start.row < coords.end.row ? coords.start.row : coords.end.row;

  for (let i = 1; i <= lowerBoundsRow-1; i++) {
    offSetY += cells[`A${i}`].style.height;
  }

  for (let j = 1; j <= lowerBoundsCol-1; j++) {
    const curCol = numToChar(j);
    offSetX += cells[`${curCol}1`].style.width;
  }

  const style = {
    x: offSetX,
    y: offSetY
  }

  return style;
}

export function getSelectionDimensions(cells, range) {
  if (range === undefined || cells === undefined)
    return {};

  const coords = parseCoord(range);

  if(!coords)
    return {};

  let totalWidth = 0;
  let totalHeight = 0;

  let upperBoundsCol = coords.start.col > coords.end.col ? coords.start.col : coords.end.col;
  let lowerBoundsCol = coords.start.col < coords.end.col ? coords.start.col : coords.end.col;

  let upperBoundsRow = coords.start.row > coords.end.row ? coords.start.row : coords.end.row;
  let lowerBoundsRow = coords.start.row < coords.end.row ? coords.start.row : coords.end.row;

  for (let i = lowerBoundsRow; i <= upperBoundsRow; i++) {
    totalHeight += cells[`A${i}`].style.height;
  }

  for (let j = lowerBoundsCol; j <= upperBoundsCol; j++) {
    const curCol = numToChar(j);
    totalWidth += cells[`${curCol}1`].style.width;
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

export function getCell(state, cellId) {
  return state.doc.sheets[getActiveSheet(state)].cells[cellId];
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

export function isHeaderActive(range, ownProps) {
  if(range === "")
    return false;

  const coord = parseCoord(range);

  if (ownProps.col) {
    if (between(charToNum(ownProps.colId), coord.start.col, coord.end.col)) {
        return true;
    }
  } else {

    if (between(ownProps.rowId, coord.start.row, coord.end.row)) {
      return true;
    }
  }

  return false;
}

export function headerSize(cells, ownProps) {
  if (ownProps.col) {
    return cells[`${ownProps.colId}1`].style.width;
  } else {
    return cells[`A${ownProps.rowId}`].style.height;
  }
}
