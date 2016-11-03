import { setUploadTaskErrors } from './FormsErrors'

export const SET_BINARY_FILE = 'CHANGE_BINARY_FILE';
export const CLEAR_BINARY_FILE = 'CLEAR_BINARY_FILE';

export const SET_BINARY_NAME = 'CHANGE_BINARY_NAME';
export const CLEAR_BINARY_NAME = 'CLEAR_BINARY_NAME';

export function setBinaryFile (b64String) {
  return {type: SET_BINARY_FILE, b64String};
}

export function clearBinaryFile () {
  return {type: CLEAR_BINARY_FILE};
}

export function setBinaryName (name) {
  return {type: SET_BINARY_NAME, name};
}

export function clearBinaryName () {
  return {type: CLEAR_BINARY_Name};
}

function handleJSON(json, dispatch) {
  if (json.hasOwnProperty('owner')) {
    console.log("Upload success !!! TODO")
  } else {
    dispatch(setUploadTaskErrors(json))
  }
}

export function uploadBinary(obj, token) {
 return dispatch => {

   let headers = new Headers({
     'Content-Type': 'application/json',
     'Authorization': 'Token ' + token
   });

   fetch('/api/task/', {
     headers: headers,
     method: 'post',
     body: JSON.stringify(obj)})
     .then(response => response.json())
     .then(json => handleJSON(json, dispatch))
 }
}