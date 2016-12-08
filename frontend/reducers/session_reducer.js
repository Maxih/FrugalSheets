import * as Action from '../actions/session_actions.js';
import {merge} from 'lodash';

const defaults = {
  currentUser: null,
  errors: []
};

export function SessionReducer(state = defaults, action) {
  switch(action.type) {
    case Action.RECEIVE_CURRENT_USER:
      return merge({}, action.session);
    case Action.RECEIVE_ERRORS:
      const newState = merge({}, defaults);
      newState.errors = action.errors;
      return newState;
    default:
      return state;
  }
}
