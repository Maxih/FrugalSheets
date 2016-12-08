import * as Util from '../utils/document_api_util';


export const RECEIVE_DOCUMENTS = "RECEIVE_DOCUMENTS";
export const FILTER_DOCUMENTS = "FILTER_DOCUMENTS";


export const receiveDocuments = (documents) => ({
  type: RECEIVE_DOCUMENTS,
  documents: documents
});

export const filterDocuments = (searchParam) => ({
  type: FILTER_DOCUMENTS,
  searchParam
});

export function fetchDocuments() {
  return dispatch => {
    return Util.fetchDocuments().then(
      documents => dispatch(receiveDocuments(documents)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    );
  };
}
