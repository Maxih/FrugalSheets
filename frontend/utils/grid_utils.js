import merge from 'lodash/merge';
import {
  Formula
} from './formula_util';

export function colorPalette() {
  return [
    "#9bdaf3",
    "#ddcce2",
    "#fec9b8",
    "#f9d291",
    "#a9dddd",
    "#f7df8c",
    "#f7c8de",
    "#cee4a3",
    "#00a0dc",
    "#8d6cab",
    "#ef6c5a",
    "#e68523",
    "#00aeb3",
    "#f0c23b",
    "#ee62a2",
    "#7cb82f",
  ];
}

export function darkerPalette() {
  return colorPalette().map((color) => {
    return LightenDarkenColor(color, -40);
  });
}

export function mapChartData(data) {
  return {
    type: data.type,
    data: {
      labels: data.titles,
      datasets: [{
        label: data.name,
        data: data.data,
        backgroundColor: data.background,
        borderColor: data.borders,
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        labels: {
          boxWidth: data.type === 'pie' ? 20 : 0
        }
      },
      layout: {
        padding: 5
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  }
}

export function expandRange(oldRange, newRange) {
  const oldCoords = parseCoord(oldRange);
  const newCoords = parseCoord(newRange);

  const numCols = Math.abs(oldCoords.start.col - oldCoords.end.col);
  const numRows = Math.abs(oldCoords.start.row - oldCoords.end.row);


  let upperBoundsCol = newCoords.start.col > newCoords.end.col ? newCoords.start.col : newCoords.end.col;
  let lowerBoundsCol = newCoords.start.col < newCoords.end.col ? newCoords.start.col : newCoords.end.col;

  let upperBoundsRow = newCoords.start.row > newCoords.end.row ? newCoords.start.row : newCoords.end.row;
  let lowerBoundsRow = newCoords.start.row < newCoords.end.row ? newCoords.start.row : newCoords.end.row;

  if ((upperBoundsRow - lowerBoundsRow - numRows) > (upperBoundsCol - lowerBoundsCol - numCols)) {
    upperBoundsCol = newCoords.start.col + numCols;
    lowerBoundsCol = newCoords.start.col;
  } else {
    upperBoundsRow = newCoords.start.row + numRows;
    lowerBoundsRow = newCoords.start.row;
  }

  return `${numToChar(upperBoundsCol)}${upperBoundsRow}:${numToChar(lowerBoundsCol)}${lowerBoundsRow}`
}

export function getFormulaRange(cells, coord) {
  const parsed = parseCoord(coord);

  if (!parsed)
    return [];

  return getCellsBetween(parsed.start, parsed.end);
}

export function getCellsBetween(start, end) {
  if (start === undefined || end === undefined)
    return [];

  let upperBoundsCol = start.col > end.col ? start.col : end.col;
  let lowerBoundsCol = start.col < end.col ? start.col : end.col;

  let upperBoundsRow = start.row > end.row ? start.row : end.row;
  let lowerBoundsRow = start.row < end.row ? start.row : end.row;


  const cells = [];

  for (let i = lowerBoundsRow; i <= upperBoundsRow; i++) {
    for (let j = lowerBoundsCol; j <= upperBoundsCol; j++) {
      cells.push(`${numToChar(j)}${i}`);
    }
  }

  return cells;
}

export function splitCoord(coord) {
  const matcher = /([A-Z]+)([0-9]+)/g;
  const matched = matcher.exec(coord);

  return {
    col: matched[1],
    row: matched[2]
  }
}

export function parseCoord(coord) {
  const matcher = /([a-zA-Z0-9]+!)?([A-Z]+)([0-9]+)(:([A-Z]+)([0-9]+))?/g;
  const matched = matcher.exec(coord);

  if (matched === null)
    return false;

  const startCoord = {
    col: charToNum(matched[2]),
    row: parseInt(matched[3])
  }

  const coords = {
    sheet: null,
    start: startCoord,
    end: startCoord
  }

  if (matched[5] != undefined) {
    coords.end = {
      col: charToNum(matched[5]),
      row: parseInt(matched[6])
    }
  }

  if (matched[1] != undefined) {
    coords.sheet = matched[1].slice(0, matched[1].length - 1);
  }

  return coords;
}

export function curCell(cells, cellId) {
  return cells[cellId] || blankCell(cellId);
}

export function blankState(rows = 50, cols = 26) {
  const cells = {};

  // for (let i = 1; i <= rows; i++) {
  //   for (let j = 1; j <= cols; j++) {
  //     let id = `${numToChar(j)}${i}`;
  //     cells[id] = blankCell(id);
  //   }
  // }

  const workingAreaDefaults = {
    activeCell: "A1",
    activeRange: "A1:A1",
    duplicateRange: "",
    selecting: false,
    directional: false,
  };

  const defaults = {
    activeSheet: "Sheet1",
    sheets: {
      "Sheet1": {
        name: "Sheet1",
        rows: rows,
        cols: cols,
        rangeGroups: [],
        colSizes: {},
        rowSizes: {},
        formulas: {},
        cells: cells,
        charts: {},
        workingArea: workingAreaDefaults,
      }
    }
  };

  return defaults;
}

export function blankSheet() {
  return blankState().sheets["Sheet1"];
}

export function blankCell(id = "") {
  return {
    id: id,
    content: "",
    style: {},
    shouldUpdate: false,
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
      if (newCell.content[0] === "=") {
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

export function newChartName(taken) {
  let sheetId = 2;
  let testName = `Chart${sheetId}`;
  while (taken.indexOf(testName) > -1) {
    sheetId++;
    testName = `Chart${sheetId}`;
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
