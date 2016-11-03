export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';
export const TOGGLE_LOGIN_FETCHING = 'TOGGLE_LOGIN_FETCHING';
export const SWITCH_BETWEEN_LOGIN_SIGNUP = 'SWITCH_BETWEEN_LOGIN_SIGNUP';

export const LOGIN_FORM = 'LOGIN';
export const SIGNUP_FORM = 'SIGNUP';

export function openLoginModal() {
  return {type: TOGGLE_LOGIN_MODAL, isOpen: true};
}

export function closeLoginModal() {
  return {type: TOGGLE_LOGIN_MODAL, isOpen: false};
}

export function startLoginFetching() {
  return {type: TOGGLE_LOGIN_FETCHING, isFetching: true};
}

export function stopLoginFetching() {
  return {type: TOGGLE_LOGIN_FETCHING, isFetching: false};
}

export function activeSignup() {
  return {type: SWITCH_BETWEEN_LOGIN_SIGNUP, target: SIGNUP_FORM }
}

export function activeLogin() {
  return {type: SWITCH_BETWEEN_LOGIN_SIGNUP, target: LOGIN_FORM }
}
