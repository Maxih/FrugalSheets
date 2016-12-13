import * as Action from '../actions/sheet_actions.js';
import {
  blankState,
  blankSheet,
  between,
  getCellsBetween,
  getRowFromId,
  getColFromId,
  updateActiveRangeContent,
  updateActiveRangeStyle,
  mapRangeToGrid,
  newSheetName,
  getFormulaRange,
  toggleShouldUpdate
} from '../utils/grid_utils';
import {
  merge
} from 'lodash';

function CellReducer(state, action) {
  switch (action.type) {
    case Action.UPDATE_CELL:
      console.log(action.cell);
      return merge({}, state, action.cell, {shouldUpdate: !action.cell.shouldUpdate});

    default:
      return state;
  }
}

function RowReducer(state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case Action.UPDATE_CELL:
      newState[action.cell.pos.col] = CellReducer(newState[action.cell.pos.col], action);
      return newState;

    default:
      return state;
  }
}

function GridReducer(state, action) {

  const newState = Object.assign({}, state);
  switch (action.type) {

    case Action.UPDATE_CELL:
      newState[action.cell.pos.row] = RowReducer(newState[action.cell.pos.row], action);
      return newState;

    case Action.UPDATE_RANGE:
      for(let i = 0; i < action.range.activeRange.length; i++) {
        for(let j = 0; j < action.range.activeRange[i].length; j++) {
          const cell = action.range.activeRange[i][j];
          const newAction = {
            type: Action.UPDATE_CELL,
            cell: merge({}, cell, {style: action.cell.style})
          }
          newState[cell.pos.row] = RowReducer(newState[cell.pos.row], newAction);
        }
      }

      return newState;

    case Action.RESIZE_COL:
      for (let i = 0; i < state.length; i++) {
        const newAction = {
          type: Action.UPDATE_CELL,
          cell: merge({}, newState[i][action.colId], {width: action.width})
        }
        newState[i] = RowReducer(newState[i], newAction);
      }

      return newState;
    case Action.RESIZE_ROW:
      for (let i = 0; i < state[0].length; i++) {
        const newAction = {
          type: Action.UPDATE_CELL,
          cell: merge({}, newState[action.rowId][i], {height: action.height})
        }
        newState[action.rowId] = RowReducer(newState[action.rowId], newAction);
      }

      return newState;

    default:
      return state;
  }
}

function WorkingAreaReducer(state, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case Action.MOVE_ACTIVE_CELL:
      const newRow = newState.activeCell.pos.row + action.delta.row;
      const newCol = newState.activeCell.pos.col + action.delta.col;

      if(between(newRow, 0, action.grid.length-1) && between(newCol, 0, action.grid[0].length-1)) {
        newState.activeCell = action.grid[newRow][newCol];
        newState.activeRange = getCellsBetween(action.grid, newState.activeCell.pos, newState.activeCell.pos);
      }
      return newState;

    case Action.MOVE_ACTIVE_RANGE:
      const numRows1 = newState.activeRange.length - 1;
      const numCols1 = newState.activeRange[0].length - 1;
      const newRow1 = newState.activeRange[numRows1][numCols1].pos.row + action.delta.row;
      const newCol1 = newState.activeRange[numRows1][numCols1].pos.col + action.delta.col;

      if(between(newRow1, 0, action.grid.length-1) && between(newCol1, 0, action.grid[0].length-1)) {
        const newCell = action.grid[newRow1][newCol1];
        newState.activeRange = getCellsBetween(action.grid, newState.activeRange[0][0].pos, newCell.pos);
      }

      return newState;

    case Action.SELECT_COL:
      newState.activeRange = getColFromId(action.grid, action.colId);
      newState.activeCell = action.grid[0][action.colId];
      return newState;

    case Action.SELECT_ROW:
      newState.activeRange = getRowFromId(action.grid, action.rowId);
      newState.activeCell = action.grid[action.rowId][0];
      return newState;


    case Action.RECEIVE_START_CELL:
      newState.selecting = true;
      newState.directional = action.directional;

      if (action.cell !== null)
        newState.activeCell = action.cell;

      if (action.directional)
        newState.duplicateRange = newState.activeRange;

      return newState;

    case Action.RECEIVE_END_CELL:
      if (action.cell !== null) {
        const numRows = newState.duplicateRange.length || 0;
        const numCols = newState.duplicateRange[0] === undefined ? 0 : newState.duplicateRange[0].length;

        newState.activeRange = getCellsBetween(action.grid, newState.activeCell.pos, action.cell.pos, newState.directional, numRows, numCols)

        // if (newState.directional) {
        //   updateActiveRangeContent(newState.duplicateRange, newState.activeRange);
        //   // mapRangeToGrid(newState.activeRange, action.grid);
        // }
      }

      newState.selecting = false;
      newState.directional = false;

      return newState;

    case Action.SELECTING_TEMP_CELL:
      const numRows = newState.duplicateRange.length || 0;
      const numCols = newState.duplicateRange[0] === undefined ? 0 : newState.duplicateRange[0].length;
      newState.activeRange = getCellsBetween(action.grid, newState.activeCell.pos, action.cell.pos, newState.directional, numRows, numCols)

      return newState;

    default:
      return state;
  }
}

function RangeGroupReducer(state, action) {
  switch (action.type) {
    case Action.UPDATE_RANGE_GROUPS:
      return action.groups.map((group) => getFormulaRange(action.grid, group));

    default:
      return state;
  }
}

function SheetReducer(state, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case Action.UPDATE_RANGE:
      action.range = Object.freeze(newState.workingArea);
    case Action.RESIZE_COL:
    case Action.RESIZE_ROW:
    case Action.UPDATE_CELL:
      newState.data = GridReducer(newState.data, action);
      return newState;

    case Action.SELECTING_TEMP_CELL:
    case Action.SELECT_COL:
    case Action.SELECT_ROW:
    case Action.MOVE_ACTIVE_CELL:
    case Action.MOVE_ACTIVE_RANGE:
      action.grid = Object.freeze(newState.data);

    case Action.RECEIVE_START_CELL:
      newState.workingArea = WorkingAreaReducer(newState.workingArea, action);
      return newState;

    case Action.RECEIVE_END_CELL:
      action.grid = Object.freeze(newState.data);
      newState.workingArea = WorkingAreaReducer(newState.workingArea, action);
      if(newState.workingArea.directional) {
        newAction = {
          type: Action.UPDATE_RANGE,
          range: newState.workingArea
        }
        newState.data = GridReducer(newState.data, newAction);
      }

      return newState;

    case Action.UPDATE_RANGE_GROUPS:
      action.grid = Object.freeze(newState.data);
      newState.rangeGroups = RangeGroupReducer(newState.rangeGroups, action);
      return newState;

    default:
      return state;
  }
}

function SheetsReducer(state, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case Action.UPDATE_RANGE:
    case Action.UPDATE_CELL:
    case Action.MOVE_ACTIVE_CELL:
    case Action.MOVE_ACTIVE_RANGE:
    case Action.RECEIVE_START_CELL:
    case Action.RECEIVE_END_CELL:
    case Action.SELECTING_TEMP_CELL:
    case Action.RESIZE_COL:
    case Action.RESIZE_ROW:
    case Action.SELECT_COL:
    case Action.SELECT_ROW:
    case Action.UPDATE_RANGE_GROUPS:
      newState[action.activeSheet] = SheetReducer(newState[action.activeSheet], action);

      return newState;

    case Action.ADD_SHEET:
      newState[action.name] = blankState().sheets["Sheet1"];
      newState[action.name].name = action.name;

      return newState;

    default:
      return state;
  }
}

function DocumentReducer(state = blankState(), action) {
  const newState = Object.assign({}, state);

  switch (action.type) {

    /* Delegate to Reducers */
    case Action.UPDATE_RANGE:
    case Action.UPDATE_CELL:
    case Action.MOVE_ACTIVE_CELL:
    case Action.MOVE_ACTIVE_RANGE:
    case Action.RECEIVE_START_CELL:
    case Action.RECEIVE_END_CELL:
    case Action.SELECTING_TEMP_CELL:
    case Action.RESIZE_COL:
    case Action.RESIZE_ROW:
    case Action.SELECT_COL:
    case Action.SELECT_ROW:
    case Action.UPDATE_RANGE_GROUPS:
      action.activeSheet = newState.activeSheet;
      newState.sheets = SheetsReducer(newState.sheets, action);

      return newState;

    /* Document only actions */
    case Action.RECEIVE_DOCUMENT:
    const newDoc = merge(
        {},
        JSON.parse(action.doc.content),
        { id: action.doc.id, name: action.doc.name }
      );
      return newDoc;

    case Action.UPDATE_DOCUMENT_NAME:
      newState.name = action.name;
      return newState;

    case Action.CHANGE_ACTIVE_SHEET:
      newState.activeSheet = action.activeSheet;
      return newState;

    case Action.ADD_SHEET:
      newState.activeSheet = action.name;
      newState.sheets = SheetsReducer(newState.sheets, action);

      return newState;

    default:
      return state;
  }



}
//
// function SheetReducer(state = blankState(), action) {
//   const now = new Date();
//   const newState = merge({}, state);
//   const curSheet = newState.sheets[newState.activeSheet];
//   const curWorkingArea = curSheet.workingArea;
//
//   switch (action.type) {
//
//     case Action.UPDATE_CELL:
//     let teststate = Object.assign({}, state, testsheets);
//     let testsheets = Object.assign({}, state.sheets, testsheet);
//     let testsheet = Object.assign({}, state.sheets[state.activeSheet], testgrid);
//     let testgrid = Object.assign({}, state.sheets[state.activeSheet].data, testgrid[action.cell.pos.row]);
//     let testrow = Object.assign({}, state.sheets[state.activeSheet].data[action.cell.pos.row], testrow[action.cell.pos.col])
//     let testCell = Object.assign({}, state.sheets[state.activeSheet].data[action.cell.pos.row][action.cell.pos.col], action.cell)
//
//     const newCell = CellReducer(state.sheets[state.activeSheet].data[action.cell.pos.row][action.cell.pos.col], action)
//
//
//
//
//
//     case Action.UPDATE_RANGE:
//       curWorkingArea.activeRange = updateActiveRangeStyle(curWorkingArea.activeRange, action.cell);
//       curSheet.data = mapRangeToGrid(curWorkingArea.activeRange, curSheet.data);
//
//     case Action.UPDATE_CELL:
//       let testCell = Object.assign({}, state.sheets[state.activeSheet].data[action.cell.pos.row][action.cell.pos.col], action.cell)
//       let testrow = Object.assign({}, state.sheets[state.activeSheet].data[action.cell.pos.row], testrow[action.cell.pos.col])
//       let testgrid = Object.assign({}, state.sheets[state.activeSheet].data, testgrid[action.cell.pos.row]);
//       let testsheet = Object.assign({}, state.sheets[state.activeSheet], testgrid);
//       let testsheets = Object.assign({}, state.sheets, testsheet);
//       let teststate = Object.assign({}, state, testsheets);
//
//
//       testCell.shouldUpdate = !testCell.shouldUpdate;
//
//       // curSheet.data[action.cell.pos.row][action.cell.pos.col] = action.cell;
//       // toggleShouldUpdate(curSheet.data, action.cell.pos.row, action.cell.pos.col);
//       // curWorkingArea.activeCell = action.cell;
//       return teststate;
//
//
//     case Action.CHANGE_ACTIVE_SHEET:
//       newState.activeSheet = action.activeSheet
//       return newState;
//
//     case Action.ADD_SHEET:
//       newState.sheets[action.name] = blankState().sheets["Sheet1"];
//       newState.sheets[action.name].name = action.name;
//       newState.activeSheet = action.name;
//       return newState;
//
//     case Action.MOVE_ACTIVE_CELL:
//       const newRow = curWorkingArea.activeCell.pos.row + action.delta.row;
//       const newCol = curWorkingArea.activeCell.pos.col + action.delta.col;
//
//       if(between(newRow, 0, curSheet.data.length-1) && between(newCol, 0, curSheet.data[0].length-1)) {
//         curWorkingArea.activeCell = curSheet.data[newRow][newCol];
//         curWorkingArea.activeRange = getCellsBetween(curSheet.data, curWorkingArea.activeCell.pos, curWorkingArea.activeCell.pos);
//       }
//
//       return newState;
//
//     case Action.MOVE_ACTIVE_RANGE:
//       const numRows1 = curWorkingArea.activeRange.length - 1;
//       const numCols1 = curWorkingArea.activeRange[0].length - 1;
//       const newRow1 = curWorkingArea.activeRange[numRows1][numCols1].pos.row + action.delta.row;
//       const newCol1 = curWorkingArea.activeRange[numRows1][numCols1].pos.col + action.delta.col;
//
//       if(between(newRow1, 0, curSheet.data.length-1) && between(newCol1, 0, curSheet.data[0].length-1)) {
//         const newCell = curSheet.data[newRow1][newCol1];
//         curWorkingArea.activeRange = getCellsBetween(curSheet.data, curWorkingArea.activeRange[0][0].pos, newCell.pos);
//       }
//
//       return newState;
//
//     case Action.RECEIVE_START_CELL:
//       curWorkingArea.selecting = true;
//       if (action.cell !== null) {
//         curWorkingArea.activeCell = action.cell;
//         toggleShouldUpdate(curSheet.data, action.cell.pos.row, action.cell.pos.col);
//       }
//
//       curWorkingArea.directional = action.directional;
//       if (action.directional) {
//         curWorkingArea.duplicateRange = curWorkingArea.activeRange;
//       }
//
//
//       return newState;
//
//     case Action.RECEIVE_END_CELL:
//       if (action.cell !== null) {
//         const numRows = curWorkingArea.duplicateRange.length || 0;
//         const numCols = curWorkingArea.duplicateRange[0] === undefined ? 0 : curWorkingArea.duplicateRange[0].length;
//
//         curWorkingArea.activeRange = getCellsBetween(curSheet.data, curWorkingArea.activeCell.pos, action.cell.pos, curWorkingArea.directional, numRows, numCols)
//
//         if (curWorkingArea.directional) {
//           updateActiveRangeContent(curWorkingArea.duplicateRange, curWorkingArea.activeRange);
//           mapRangeToGrid(curWorkingArea.activeRange, curSheet.data);
//         }
//       }
//
//       curWorkingArea.selecting = false;
//       curWorkingArea.directional = false;
//
//       return newState;
//     case Action.SELECTING_TEMP_CELL:
//       const numRows = curWorkingArea.duplicateRange.length || 0;
//       const numCols = curWorkingArea.duplicateRange[0] === undefined ? 0 : curWorkingArea.duplicateRange[0].length;
//       curWorkingArea.activeRange = getCellsBetween(curSheet.data, curWorkingArea.activeCell.pos, action.cell.pos, curWorkingArea.directional, numRows, numCols)
//
//       return newState;
//
//     case Action.RESIZE_COL:
//       for (let i = 0; i < curSheet.data.length; i++)
//         curSheet.data[i][action.colId].width = action.width;
//
//       return newState;
//
//     case Action.RESIZE_ROW:
//       for (let i = 0; i < curSheet.data[0].length; i++)
//         curSheet.data[action.rowId][i].height = action.height;
//
//       return newState;
//
//     case Action.SELECT_COL:
//       curWorkingArea.activeRange = getColFromId(curSheet.data, action.colId);
//       curWorkingArea.activeCell = curSheet.data[0][action.colId];
//       return newState;
//
//     case Action.SELECT_ROW:
//       curWorkingArea.activeRange = getRowFromId(curSheet.data, action.rowId);
//       curWorkingArea.activeCell = curSheet.data[action.rowId][0];
//       return newState;
//
//     case Action.RECEIVE_DOCUMENT:
//       const newDoc = merge({}, JSON.parse(action.doc.content), {
//         id: action.doc.id
//       }, {
//         name: action.doc.name
//       });
//       return newDoc;
//
//     case Action.UPDATE_DOCUMENT_NAME:
//       newState.name = action.name;
//       return newState;
//
//     case Action.UPDATE_RANGE_GROUPS:
//       curSheet.rangeGroups = action.groups.map((group) => getFormulaRange(curSheet.data, group));
//
//       return newState
//
//     default:
//       return state;
//   }
//
//
//
// }

export default DocumentReducer;
