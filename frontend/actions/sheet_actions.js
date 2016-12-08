import * as Util from '../utils/document_api_util';

export const UPDATE_CELL = "UPDATE_CELL";
export const UPDATE_RANGE = "UPDATE_RANGE";
export const CHANGE_ACTIVE_SHEET = "CHANGE_ACTIVE_SHEET";
export const ADD_SHEET = "ADD_SHEET";
export const RECEIVE_START_CELL = "RECEIVE_START_CELL";
export const RECEIVE_END_CELL = "RECEIVE_END_CELL";
export const SELECTING_TEMP_CELL = "SELECTING_TEMP_CELL";
export const RESIZE_ROW = "RESIZE_ROW";
export const RESIZE_COL = "RESIZE_COL";
export const SELECT_ROW = "SELECT_ROW";
export const SELECT_COL = "SELECT_COL";
export const RECEIVE_DOCUMENT = "RECEIVE_DOCUMENT";
export const UPDATE_DOCUMENT_NAME = "UPDATE_DOCUMENT_NAME";

export const updateCell = (cell) => ({
  type: UPDATE_CELL,
  cell: cell
});

export const updateRange = (cell) => ({
  type: UPDATE_RANGE,
  cell: cell
});

export const changeActiveSheet = (sheet) => ({
  type: CHANGE_ACTIVE_SHEET,
  activeSheet: sheet
});

export const addSheet = (sheetName) => ({
  type: ADD_SHEET,
  name: sheetName
});

export const receiveStartCell = (cell) => ({
  type: RECEIVE_START_CELL,
  cell: cell,
  selecting: true
});

export const receiveEndCell = (cell) => ({
  type: RECEIVE_END_CELL,
  cell: cell,
  selecting: false
});

export const tempEndCell = (cell) => ({
  type: SELECTING_TEMP_CELL,
  cell: cell
});

export const resizeRow = (rowId, height) => ({
  type: RESIZE_ROW,
  rowId,
  height
});

export const resizeCol = (colId, width) => ({
  type: RESIZE_COL,
  colId,
  width
});

export const selectRow = (rowId) => ({
  type: SELECT_ROW,
  rowId
});

export const selectCol = (colId) => ({
  type: SELECT_COL,
  colId
});

export const receiveDocument = (doc) => ({
  type: RECEIVE_DOCUMENT,
  doc: doc
});

export const updateDocumentName = (name) => ({
  type: UPDATE_DOCUMENT_NAME,
  name: name
});


export function loadDocument(docId) {
  return dispatch => {
    return Util.loadDocument(docId).then(
      doc => dispatch(receiveDocument(doc)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    );
  }
}

export function saveDocument(doc) {
  return dispatch => {
    return Util.saveDocument(doc).then(
      doc => dispatch(receiveDocument(doc)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    );
  };
}

export function createDocument(doc) {
  return dispatch => {
    return Util.createDocument(doc).then(
      doc => dispatch(receiveDocument(doc)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    );
  };
}
