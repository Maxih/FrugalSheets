import merge from 'lodash/merge';

// export const DataType = {
//   INTEGER: "INTEGER",
//   FORMULA: "FORMULA",
//   TEXT: "TEXT"
// };

// export class Cell {
//   constructor(cellData) {
//     this.cell = {
//       content: "",
//       width: 100,
//       height: 26,
//       style: {},
//       type: DataType.TEXT,
//       pos: {
//           row: 0,
//           col: 0
//       }
//     }
//     this.cell = merge(this.cell, cellData);
//
//   }
// }

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
    };

    const defaults = {
        activeSheet: "Sheet1",
        sheets: {
            "Sheet1": {
                name: "Sheet1",
                workingArea: workingAreaDefaults,
                data: blankSheet()
            }
        }
    };

    return defaults;
}

export function blankSheet() {
    const grid = new Array(30);

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

export function mapRangeToGrid(range, grid) {
    for (let i = 0; i < range.length; i++) {
        for (let j = 0; j < range[i].length; j++) {
            const cell = range[i][j];
            grid[cell.pos.row][cell.pos.col] = cell;
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

export function getCellsBetween(gridState, start, end) {
    const upperBoundsCol = start.col > end.col ? start.col : end.col;
    const lowerBoundsCol = start.col < end.col ? start.col : end.col;

    const upperBoundsRow = start.row > end.row ? start.row : end.row;
    const lowerBoundsRow = start.row < end.row ? start.row : end.row;

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

    return (usePound?"#":"") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
}

export const compare = function (obj1, obj2) {
	//Loop through properties in object 1
	for (var p in obj1) {
		//Check property exists on both objects
		if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

		switch (typeof (obj1[p])) {
			//Deep compare objects
			case 'object':
				if (!compare(obj1[p], obj2[p])) return false;
				break;
			//Compare function code
			case 'function':
				if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
				break;
			//Compare values
			default:
				if (obj1[p] != obj2[p]) return false;
		}
	}

	//Check object 2 for any extra properties
	for (var p in obj2) {
		if (typeof (obj1[p]) == 'undefined') return false;
	}
	return true;
};
