import * as Util from './grid_utils';

export const fetchDocuments = (success, error) => {
  return $.ajax({
    method: "GET",
    url: `/api/documents`,
    success,
    error
  });
};

export const loadDocument = (docId, success, error) => {
  return $.ajax({
    method: "GET",
    url: `/api/documents/${docId}`,
    success,
    error
  });
}

export const saveDocument = (doc, success, error) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/documents/${doc.id}`,
    data: {id: doc.id, name: doc.name, content: JSON.stringify(doc)},
    success,
    error
  });
}
export const createDocument = (success, error) => {
  return $.ajax({
    method: "POST",
    url: `/api/documents`,
    data: {name: "Untitled spreadsheet", content: JSON.stringify(Util.blankState())},
    success,
    error
  });
}
