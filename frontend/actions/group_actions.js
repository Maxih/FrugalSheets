import * as Util from '../utils/group_api_util';


export const RECEIVE_GROUPS = "RECEIVE_GROUPS";
export const RECEIVE_GROUP = "RECEIVE_GROUP";
export const SELECT_GROUP = "SELECT_GROUP";


export const receiveGroups = (groups) => ({
  type: RECEIVE_GROUPS,
  groups: groups
});

export const receiveGroup = (group) => ({
  type: RECEIVE_GROUP,
  group: group
});

export const selectGroup = (groupId) => ({
  type: SELECT_GROUP,
  groupId: groupId
});

export function fetchGroups() {
  return dispatch => {
    return Util.fetchGroups().then(
      groups => dispatch(receiveGroups(groups)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    );
  };
}

export function saveGroup(group) {
  return dispatch => {
    return Util.saveGroup(group).then(
      group => dispatch(receiveGroup(group)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    );
  };
}

export function createGroup(group) {
  return dispatch => {
    return Util.createGroup(group).then(
      group => dispatch(receiveGroup(group)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    );
  };
}
