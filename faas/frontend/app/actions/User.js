import { startLoginFetching, stopLoginFetching, closeLoginModal } from './UI'
import { setLoginErrors, setSignupErrors } from './FormsErrors'

import Cookies from 'js-cookie';

export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_USERNAME = 'SAVE_USERNAME';
export const LOGOUT = 'LOGOUT';

export function saveToken(token) {
  Cookies.set('token', token, { expires: 1 });
  return {type: SAVE_TOKEN, token: token};
}

export function saveUserName(username) {
  return {type: SAVE_USERNAME, username: username};
}

export function cleanCredentials() {
  return {type: LOGOUT};
}

// Ajax handling
const headers = new Headers({
  'Content-Type': 'application/json'
});

const handleLoginJSON = (dispatch, json) => {
  if (json.hasOwnProperty('key')) {
    dispatch(saveToken(json.key))
    dispatch(fetchUsername(json.key))
    dispatch(closeLoginModal());
  } else
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
     .then(json => handleLoginJSON(dispatch, json))
 }
}

const handleSignupJSON = (dispatch, json) => {
  if (json.hasOwnProperty('key')) {
    dispatch(saveToken(json.key))
    dispatch(fetchUsername(json.key))
    dispatch(closeLoginModal());
  } else
    dispatch(setSignupErrors(json))
}

export function fetchSignup(creds) {
 return dispatch => {
   dispatch(startLoginFetching);
   fetch('/api/auth/registration', {
     headers: headers,
     method: 'post',
     body: JSON.stringify(creds)})
     .then(response => response.json())
     .then(json => handleSignupJSON(dispatch, json))
 }
}

export function fetchUsername(token) {

  let header = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  });

 return dispatch => {
   dispatch(startLoginFetching);
   fetch('/api/auth/user/', {
     headers: header,
     method: 'get'})
     .then(response => response.json())
     .then(json => dispatch(saveUserName(json.username)))
 }
}

export function logout(token) {

  let header = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  });

 return dispatch => {
   dispatch(startLoginFetching);
   fetch('/api/auth/logout/', {
     headers: header,
     method: 'post'})
     .then((_) => {
       dispatch(cleanCredentials());
       Cookies.remove('token');
     });
 }
}
