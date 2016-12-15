import * as Action from '../actions/group_actions.js';
import {
  merge
} from 'lodash';

const defaults = {
  list: {},
  active: -2
}

export default function GroupReducer(state = defaults, action) {
  switch (action.type) {
    case Action.RECEIVE_GROUPS:
      const groups = {};
      action.groups.forEach((group) => {
        groups[group.id] = group;
      });

      return merge({}, state, {list: groups});

    case Action.SELECT_GROUP:
      return Object.assign({}, state, {active: action.groupId});

    default:
      return state;
  }
}
