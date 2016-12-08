import * as Action from '../actions/document_actions.js';
import {merge} from 'lodash';

export function DocumentReducer(state = [], action) {
  switch(action.type) {
    case Action.RECEIVE_DOCUMENTS:
      return merge({}, action.documents);

    default:
      return state;
  }
}
