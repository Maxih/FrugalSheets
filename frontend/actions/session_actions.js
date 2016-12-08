import * as Util from '../utils/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
});

export function login(user) {
  return dispatch => {
    return Util.login(user).then(
      user => dispatch(receiveCurrentUser(user)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    );
  };
}

export function logout() {
  return dispatch => {
    return Util.logout().then(
      () => dispatch(receiveCurrentUser(null)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    );
  };
}


export function signup(user) {
  return dispatch => {
    return Util.signup(user).then(
      users => dispatch(receiveCurrentUser(user)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    );
  };
}
