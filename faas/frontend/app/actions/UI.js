export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';
export const TOGGLE_LOGIN_FETCHING = 'TOGGLE_LOGIN_FETCHING';

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
