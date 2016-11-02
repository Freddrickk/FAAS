export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';

export function setLoginErrors (errors) {
  return {type: SET_LOGIN_ERROR, errors};
}

export function clearLoginErrors () {
  return {type: CLEAR_LOGIN_ERROR};
}
