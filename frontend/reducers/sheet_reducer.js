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
  toggleShouldUpdate,
  parseCoord,
  numToChar,
  charToNum,
  expandRange,
} from '../utils/grid_utils';
import {
  merge
} from 'lodash';

function DocumentReducer(state = blankState(), action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case Action.RECEIVE_START_CELL:
    case Action.RECEIVE_END_CELL:
    case Action.SELECTING_TEMP_CELL:
    case Action.UPDATE_CELL:
    case Action.UPDATE_RANGE:
    case Action.SELECT_COL:
    case Action.SELECT_ROW:
    case Action.RESIZE_COL:
    case Action.RESIZE_ROW:
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

function SheetsReducer(state, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case Action.RECEIVE_START_CELL:
    case Action.RECEIVE_END_CELL:
    case Action.SELECTING_TEMP_CELL:
    case Action.UPDATE_CELL:
    case Action.UPDATE_RANGE:
    case Action.SELECT_COL:
    case Action.SELECT_ROW:
    case Action.RESIZE_COL:
    case Action.RESIZE_ROW:
    case Action.UPDATE_RANGE_GROUPS:
      newState[action.activeSheet] = SheetReducer(newState[action.activeSheet], action);
      return newState;

    default:
      return state;
  }
}

function SheetReducer(state, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case Action.UPDATE_RANGE_GROUPS:
      action.cells = Object.freeze(newState.cells);
      newState.rangeGroups = RangeGroupReducer(newState.rangeGroups, action);
      return newState;

    case Action.RESIZE_COL:
    case Action.RESIZE_ROW:
      action.rows = newState.rows;
      action.cols = newState.cols;

      if(action.type === Action.RESIZE_COL)
        newState.colSizes = Object.assign({}, newState.colSizes, {[action.colId]: action.width})

      if(action.type === Action.RESIZE_ROW)
        newState.rowSizes = Object.assign({}, newState.rowSizes, {[action.rowId]: action.height})

    case Action.UPDATE_CELL:
      if(action.cell.content[0] === "=") {
        newState.formulas = Object.assign({}, newState.formulas, {[action.cell.id]: action.cell.content})
      } else {
        if(newState.formulas[action.cell.id] !== undefined) {
          newState.formulas = Object.assign({}, newState.formulas)
          delete newState.formulas[action.cell.id];
        }
      }
    case Action.UPDATE_RANGE:
      action.range = newState.workingArea.activeRange;
      newState.cells = CellReducer(newState.cells, action);
      return newState;

    case Action.SELECT_COL:
    case Action.SELECT_ROW:
      action.rows = newState.rows;
      action.cols = newState.cols;

    case Action.RECEIVE_START_CELL:
    case Action.RECEIVE_END_CELL:
    case Action.SELECTING_TEMP_CELL:

      newState.workingArea = WorkingAreaReducer(newState.workingArea, action);
      return newState;

    default:
      return state;
  }
}

function WorkingAreaReducer(state, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {

    case Action.RECEIVE_START_CELL:
      newState.selecting = true;
      newState.directional = action.directional;

      if (action.cell !== null)
        newState.activeCell = action.cell.id;

      if (action.directional)
        newState.duplicateRange = newState.activeRange;

      return newState;

    case Action.RECEIVE_END_CELL:
      if (action.cell !== null) {
        const newRange = `${newState.activeCell}:${action.cell.id}`;
        if(newState.directional)
          newState.activeRange = expandRange(newState.duplicateRange, newRange);
        else
          newState.activeRange = newRange;
      }

      newState.selecting = false;
      newState.directional = false;

      return newState;

    case Action.SELECTING_TEMP_CELL:
      if (action.cell !== null) {
        const newTempRange = `${newState.activeCell}:${action.cell.id}`;
        if(newState.directional)
          newState.activeRange = expandRange(newState.duplicateRange, newTempRange);
        else
          newState.activeRange = newTempRange;
      }

      return newState;

    case Action.SELECT_COL:
      newState.activeRange = `${action.colId}1:${action.colId}${action.rows}`;
      newState.activeCell = `${action.colId}1`;
      return newState;

    case Action.SELECT_ROW:
    newState.activeRange = `A${action.rowId}:${numToChar(action.cols)}${action.rowId}`;
    newState.activeCell = `A${action.rowId}`;
    return newState;

    default:
      return state;
  }
}

function RangeGroupReducer(state, action) {
  switch (action.type) {
    case Action.UPDATE_RANGE_GROUPS:
      return action.groups || [];

    default:
      return state;
  }
}


function CellReducer(state, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case Action.UPDATE_CELL:
      newState[action.cell.id] = merge({}, newState[action.cell.id], action.cell, {shouldUpdate: !action.cell.shouldUpdate});
      return newState;
    case Action.UPDATE_RANGE:
      const range = parseCoord(action.range);
      const cellMap = getCellsBetween(range.start, range.end);

      cellMap.forEach((cellId) => {
        const newCell = merge({}, newState[cellId]);
        const oldSize = {
          height: newState[cellId].style.height,
          width: newState[cellId].style.width
        }

        newCell.style = merge(newCell.style, action.cell.style, oldSize);
        newCell.shouldUpdate = !newCell.shouldUpdate;
        newState[cellId] = newCell;
      });

      return newState;

    case Action.RESIZE_COL:
      const col = charToNum(action.colId);
      const colCellMap = getCellsBetween({col: col, row: 1}, {col: col, row: action.rows});

      colCellMap.forEach((cellId) => {
        const newCell = merge({}, newState[cellId]);
        newCell.style.width = action.width
        newCell.shouldUpdate = !newCell.shouldUpdate;
        newState[cellId] = newCell;
      });

      return newState;

    case Action.RESIZE_ROW:
      const rowCellMap = getCellsBetween({col: 1, row: action.rowId}, {col: action.cols, row: action.rowId});

      rowCellMap.forEach((cellId) => {
        const newCell = merge({}, newState[cellId]);
        newCell.style.height= action.height
        newCell.shouldUpdate = !newCell.shouldUpdate;
        newState[cellId] = newCell;
      });

      return newState;
    default:
      return state;
  }
}

export default DocumentReducer;
