import { startLoginFetching, stopLoginFetching, closeLoginModal } from './UI'
import { setLoginErrors } from './FormsErrors'

export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_USERNAME = 'SAVE_USERNAME';
export const LOGOUT = 'LOGOUT';

export function saveToken(token) {
  return {type: SAVE_TOKEN, token: token};
}

export function saveUserName(username) {
  return {type: SAVE_USERNAME, username: username};
}

export function logout() {
  return {type: LOGOUT};
}

// Ajax handling
const headers = new Headers({
  'Content-Type': 'application/json'
});

const handleJSON = (dispatch, json) => {
  if (json.hasOwnProperty('key')) {
    dispatch(saveToken(json.key))
    dispatch(closeLoginModal());
  }

  else
    dispatch(setLoginErrors(json))
}

export function fetchLogin(creds) {
 return dispatch => {
   dispatch(startLoginFetching);
   fetch('/api/auth/login/', {
     headers: headers,
     method: 'post',
     body: JSON.stringify(creds)})
     .then(response => response.json())
     .then(json => handleJSON(dispatch, json))
 }
}
