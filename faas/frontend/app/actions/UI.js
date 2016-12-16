export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';
export const TOGGLE_TASK_MODAL = 'TOGGLE_TASK_MODAL';
export const TOGGLE_CRASHREPORT_MODAL = 'TOGGLE_CRASHREPORT_MODAL';
export const TOGGLE_LOGIN_FETCHING = 'TOGGLE_LOGIN_FETCHING';
export const SWITCH_BETWEEN_LOGIN_SIGNUP = 'SWITCH_BETWEEN_LOGIN_SIGNUP';

export const TOGGLE_TOASTER = 'TOGGLE_TOASTER';

export const TOGGLE_BIN_UPLOAD = 'TOGGLE_BIN_UPLOAD';

export const LOGIN_FORM = 'LOGIN';
export const SIGNUP_FORM = 'SIGNUP';

export function toggleToaster(payload) {
  return {type: TOGGLE_TOASTER, isOpen: payload};
}

export function openLoginModal() {
  return {type: TOGGLE_LOGIN_MODAL, isOpen: true};
}

export function closeLoginModal() {
  return {type: TOGGLE_LOGIN_MODAL, isOpen: false};
}

export function openTaskModal() {
  return {type: TOGGLE_TASK_MODAL, isOpen: true};
}

export function closeTaskModal() {
  return {type: TOGGLE_TASK_MODAL, isOpen: false};
}

export function openCrashReportModal() {
  return {type: TOGGLE_CRASHREPORT_MODAL, isOpen: true};
}

export function closeCrashReportModal() {
  return {type: TOGGLE_CRASHREPORT_MODAL, isOpen: false};
}


export function startLoginFetching() {
  return {type: TOGGLE_LOGIN_FETCHING, isFetching: true};
}

export function stopLoginFetching() {
  return {type: TOGGLE_LOGIN_FETCHING, isFetching: false};
}

export function startBinUpload() {
  return {type: TOGGLE_BIN_UPLOAD, isFetching: true}
}

export function stopBinUpload() {
  return {type: TOGGLE_BIN_UPLOAD, isFetching: false}
}

export function activeSignup() {
  return {type: SWITCH_BETWEEN_LOGIN_SIGNUP, target: SIGNUP_FORM }
}

export function activeLogin() {
  return {type: SWITCH_BETWEEN_LOGIN_SIGNUP, target: LOGIN_FORM }
}
