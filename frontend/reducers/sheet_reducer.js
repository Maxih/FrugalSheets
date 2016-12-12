import * as Action from '../actions/sheet_actions.js';
import {
  blankState,
  blankSheet,
  getCellsBetween,
  getRowFromId,
  getColFromId,
  updateActiveRangeContent,
  updateActiveRangeStyle,
  mapRangeToGrid,
  newSheetName,
  getFormulaRange
} from '../utils/grid_utils';
import {
  merge
} from 'lodash';


function SheetReducer(state = blankState(), action) {
  const newState = merge({}, state);
  const curSheet = newState.sheets[newState.activeSheet];
  const curWorkingArea = curSheet.workingArea;

  switch (action.type) {
    case Action.UPDATE_RANGE:
      curWorkingArea.activeRange = updateActiveRangeStyle(curWorkingArea.activeRange, action.cell);
      curSheet.data = mapRangeToGrid(curWorkingArea.activeRange, curSheet.data);

    case Action.UPDATE_CELL:
      curSheet.data[action.cell.pos.row][action.cell.pos.col] = action.cell;
      curWorkingArea.activeCell = action.cell;
      return newState;


    case Action.CHANGE_ACTIVE_SHEET:
      newState.activeSheet = action.activeSheet
      return newState;

    case Action.ADD_SHEET:
      newState.sheets[action.name] = blankState().sheets["Sheet1"];
      newState.sheets[action.name].name = action.name;
      newState.activeSheet = action.name;
      return newState;

    case Action.RECEIVE_START_CELL:
      curWorkingArea.selecting = true;
      if (action.cell !== null)
        curWorkingArea.activeCell = action.cell;

      curWorkingArea.directional = action.directional;
      if (action.directional) {
        curWorkingArea.duplicateRange = curWorkingArea.activeRange;
      }
      return newState;

    case Action.RECEIVE_END_CELL:
      if (action.cell !== null) {
        const numRows = curWorkingArea.duplicateRange.length || 0;
        const numCols = curWorkingArea.duplicateRange[0] === undefined ? 0 : curWorkingArea.duplicateRange[0].length;

        curWorkingArea.activeRange = getCellsBetween(curSheet.data, curWorkingArea.activeCell.pos, action.cell.pos, curWorkingArea.directional, numRows, numCols)

        if (curWorkingArea.directional) {


          updateActiveRangeContent(curWorkingArea.duplicateRange, curWorkingArea.activeRange);
          mapRangeToGrid(curWorkingArea.activeRange, curSheet.data);
        }
      }

      curWorkingArea.selecting = false;
      curWorkingArea.directional = false;

      return newState;
    case Action.SELECTING_TEMP_CELL:
      const numRows = curWorkingArea.duplicateRange.length || 0;
      const numCols = curWorkingArea.duplicateRange[0] === undefined ? 0 : curWorkingArea.duplicateRange[0].length;
      curWorkingArea.activeRange = getCellsBetween(curSheet.data, curWorkingArea.activeCell.pos, action.cell.pos, curWorkingArea.directional, numRows, numCols)

      return newState;

    case Action.RESIZE_COL:
      for (let i = 0; i < curSheet.data.length; i++)
        curSheet.data[i][action.colId].width = action.width;

      return newState;

    case Action.RESIZE_ROW:
      for (let i = 0; i < curSheet.data[0].length; i++)
        curSheet.data[action.rowId][i].height = action.height;

      return newState;

    case Action.SELECT_COL:
      curWorkingArea.activeRange = getColFromId(curSheet.data, action.colId);
      curWorkingArea.activeCell = curSheet.data[0][action.colId];
      return newState;

    case Action.SELECT_ROW:
      curWorkingArea.activeRange = getRowFromId(curSheet.data, action.rowId);
      curWorkingArea.activeCell = curSheet.data[action.rowId][0];
      return newState;

    case Action.RECEIVE_DOCUMENT:
      const newDoc = merge({}, JSON.parse(action.doc.content), {
        id: action.doc.id
      }, {
        name: action.doc.name
      });
      return newDoc;

    case Action.UPDATE_DOCUMENT_NAME:
      newState.name = action.name;
      return newState;

    case Action.UPDATE_RANGE_GROUPS:
      curSheet.rangeGroups = action.groups.map((group) => getFormulaRange(curSheet.data, group));

      return newState

    default:
      return newState;
  }
}

export default SheetReducer;
