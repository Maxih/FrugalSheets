import * as Action from '../actions/document_actions.js';
import {
  merge
} from 'lodash';

const defaults = {
  list: [],
  searchParam: ""
}

export default function DocumentReducer(state = defaults, action) {
  switch (action.type) {
    case Action.RECEIVE_DOCUMENTS:
      const docs = {
        list: Object.keys(action.documents).map(doc => action.documents[doc])
      };

      return merge({}, state, docs);

    case Action.FILTER_DOCUMENTS:
      return merge({}, state, {
        searchParam: action.searchParam
      })

    default:
      return state;
  }
}
