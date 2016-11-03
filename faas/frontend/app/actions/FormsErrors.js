export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';

export const SET_SIGNUP_ERROR = 'SET_SIGNUP_ERROR';
export const CLEAR_SIGNUP_ERROR = 'SET_SIGNUP_ERROR';

export const SET_UPLOAD_TASK_ERROR = 'SET_UPLOAD_TASK_ERROR';
export const CLEAR_UPLOAD_TASK_ERROR = 'CLEAR_UPLOAD_TASK_ERROR';

export function setLoginErrors (errors) {
  return {type: SET_LOGIN_ERROR, errors};
}

export function clearLoginErrors () {
  return {type: CLEAR_LOGIN_ERROR};
}

export function setSignupErrors (errors) {
  return {type: SET_SIGNUP_ERROR, errors};
}

export function clearSignupErrors () {
  return {type: CLEAR_SIGNUP_ERROR};
}

export function setUploadTaskErrors (errors) {
  return {type: SET_UPLOAD_TASK_ERROR, errors};
}

export function clearUploadTaskErrors () {
  return {type: CLEAR_UPLOAD_TASK_ERROR};
}
