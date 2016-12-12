import merge from 'lodash/merge';
import {Formula} from './formula_util';

export function toggleShouldUpdate(grid, row, col) {
  grid[row][col].shouldUpdate = !grid[row][col].shouldUpdate;
}

export function getLinkedCells(grid, links) {
  let linkKeys = Object.keys(links);
  if (linkKeys === undefined)
    return [];

  let linked = [];
  linkKeys.forEach((coord) => {

    const parsed = parseCoord(coord);

    if(!parsed)
      return;

    let curLinks = getCellsBetween(grid, parsed.start, parsed.end)
    for(let i = 0; i < curLinks.length; i++) {
      for(let j = 0; j < curLinks[0].length; j++) {
        linked.push(curLinks[i][j]);
      }
    }

  });

  return linked;
}

export function getFormulaRange(grid, coord) {
  const parsed = parseCoord(coord);

  if(!parsed)
    return [];

  return getCellsBetween(grid, parsed.start, parsed.end)
}

export function parseCoord(coord) {
  const matcher = /([a-zA-Z0-9]+!)?([A-Z]+)([0-9]+)(:([A-Z]+)([0-9]+))?/g;
  const matched = matcher.exec(coord);

  if (matched === null)
    return false;



  const startCoord = {
    col: charToNum(matched[2]) - 1,
    row: parseInt(matched[3]) - 1
  }

  const coords = {
    sheet: null,
    start: startCoord,
    end: startCoord
  }

  if(matched[5] != undefined) {
    coords.end = {
      col: charToNum(matched[5]) - 1,
      row: parseInt(matched[6]) - 1
    }
  }

  if(matched[1] != undefined) {
    coords.sheet = matched[1].slice(0, matched[1].length-1);
  }

  return coords;
}

export function blankState() {
  const workingAreaDefaults = {
    activeCell: {
      content: "",
      width: 100,
      height: 26,
      style: {},
      pos: {
        row: 0,
        col: 0
      },
    },
    activeRange: [],
    selecting: false,
    directional: false,
    duplicateRange: [],
  };

  const defaults = {
    activeSheet: "Sheet1",
    sheets: {
      "Sheet1": {
        name: "Sheet1",
        workingArea: workingAreaDefaults,
        data: blankSheet(),
        rangeGroups: []
      }
    }
  };

  return defaults;
}

export function blankSheet() {
  const grid = new Array(200);

  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(26);
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = blankCell(i, j);
    }
  }

  return grid;
}

export function blankCell(row, col) {
  return {
    content: "",
    width: 100,
    height: 26,
    style: {},
    shouldUpdate: false,
    pos: {
      row: row,
      col: col
    }
  };
}

export function updateActiveRangeStyle(range, cell) {
  for (let i = 0; i < range.length; i++) {
    for (let j = 0; j < range[i].length; j++) {
      range[i][j].style = cell.style;
    }
  }

  return range;
}

export function updateActiveRangeContent(oldRange, newRange) {
  const numRows = oldRange.length || 0;
  const numCols = oldRange[0].length || 0;

  for (let i = 0; i < newRange.length; i++) {
    for (let j = 0; j < newRange[i].length; j++) {

      let oldRow = i % numRows;
      let oldCol = j % numCols;

      const newCell = merge({}, oldRange[oldRow][oldCol]);

      // If new content is a formula, update referenced cells
      if(newCell.content[0] === "=") {
        const formula = new Formula(newCell.content.slice(1));
        let varNames = Object.keys(formula.vars);
        let varMap = {};

        // Map to dummy key so new references to same cells dont get overwritten
        varNames.map((curVar, idx) => {
          const varKey = `%${idx}`;
          newCell.content = newCell.content.replaceAll(curVar, varKey);
          varMap[curVar] = varKey;
        });

        varNames.forEach((curVar) => {
          const newCoord = parseCoord(curVar);
          let newRow = newRange[i][j].pos.row + (newCoord.start.row - newCell.pos.row) + 1;
          let newCol = newRange[i][j].pos.col + (newCoord.start.col - newCell.pos.col) + 1;

          let newVar = `${numToChar(newCol)}${newRow}`;

          newCell.content = newCell.content.replaceAll(varMap[curVar], newVar);
        });
      }

      newRange[i][j].content = newCell.content;
    }
  }

  return newRange;
}


export function mapRangeToGrid(range, grid) {
  for (let i = 0; i < range.length; i++) {
    for (let j = 0; j < range[i].length; j++) {
      const cell = range[i][j];
      grid[cell.pos.row][cell.pos.col] = cell;
      toggleShouldUpdate(grid, cell.pos.row, cell.pos.col);
    }
  }

  return grid;
}

export function getRowFromId(gridState, id) {
  return getCellsBetween(gridState, {
    col: 0,
    row: id
  }, {
    col: gridState[0].length - 1,
    row: id
  })
}

export function getColFromId(gridState, id) {
  return getCellsBetween(gridState, {
    col: id,
    row: 0
  }, {
    col: id,
    row: gridState.length - 1
  })
}

export function getCellsBetween(gridState, start, end, directional = false, numRows, numCols) {
  if(start === undefined || end === undefined)
    return [];

  let upperBoundsCol = start.col > end.col ? start.col : end.col;
  let lowerBoundsCol = start.col < end.col ? start.col : end.col;

  let upperBoundsRow = start.row > end.row ? start.row : end.row;
  let lowerBoundsRow = start.row < end.row ? start.row : end.row;

  if (directional) {
    if ((upperBoundsRow - lowerBoundsRow - numRows) > (upperBoundsCol - lowerBoundsCol - numCols)) {
      upperBoundsCol = start.col + numCols - 1;
      lowerBoundsCol = start.col;
    } else {
      upperBoundsRow = start.row + numRows - 1;
      lowerBoundsRow = start.row;
    }
  }

  const cells = [];

  for (let i = lowerBoundsRow; i <= upperBoundsRow; i++) {
    const row = [];

    for (let j = lowerBoundsCol; j <= upperBoundsCol; j++) {
      row.push(gridState[i][j]);
    }

    cells.push(row);
  }

  return cells;
}

export function cellInSelection(rowId, colId, startVal, endVal) {
  return between(colId, startVal.col, endVal.col) && between(rowId, startVal.row, endVal.row)
}

export function between(cellCoord, startVal, endVal) {

  if (!$.isNumeric(cellCoord))
    return false;

  const upperBounds = startVal > endVal ? startVal : endVal;
  const lowerBounds = startVal < endVal ? startVal : endVal;

  if (cellCoord <= upperBounds && cellCoord >= lowerBounds)
    return true;

  return false;
}
export function newSheetName(taken) {
  let sheetId = 2;
  let testName = `Sheet${sheetId}`;
  while (taken.indexOf(testName) > -1) {
    sheetId++;
    testName = `Sheet${sheetId}`;
  }
  return testName;
}

export const charToNum = function(alpha) {
  var index = 0
  for (var i = 0, j = 1; i < j; i++, j++) {
    if (alpha == numToChar(i)) {
      index = i;
      j = i;
    }
  }

  return index;
}

export const numToChar = function(number) {
  var numeric = (number - 1) % 26;
  var letter = chr(65 + numeric);
  var number2 = parseInt((number - 1) / 26);
  if (number2 > 0) {
    return numToChar(number2) + letter;
  } else {
    return letter;
  }
}

const chr = function(codePt) {
  if (codePt > 0xFFFF) {
    codePt -= 0x10000;
    return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
  }
  return String.fromCharCode(codePt);
}

export function LightenDarkenColor(col, amt) {

  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
}

export const compare = function(obj1, obj2) {
  //Loop through properties in object 1
  for (var p in obj1) {
    //Check property exists on both objects
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

    switch (typeof(obj1[p])) {
      //Deep compare objects
      case 'object':
        if (!compare(obj1[p], obj2[p])) return false;
        break;
        //Compare function code
      case 'function':
        if (typeof(obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
        break;
        //Compare values
      default:
        if (obj1[p] != obj2[p]) return false;
    }
  }

  //Check object 2 for any extra properties
  for (var p in obj2) {
    if (typeof(obj1[p]) == 'undefined') return false;
  }
  return true;
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
