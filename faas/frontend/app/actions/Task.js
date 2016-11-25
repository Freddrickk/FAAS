import { setUploadTaskErrors, clearUploadTaskErrors } from './FormsErrors'
import { fetchTaskList } from './TasksList'
import { fetchReportsList } from './ReportsList'
import { startBinUpload, stopBinUpload } from './UI'

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

function handleJSON(json, dispatch, token) {
  if (json.hasOwnProperty('owner')) {
    dispatch(fetchTaskList(token))
    dispatch(fetchReportsList(token))
  } else {
    dispatch(setUploadTaskErrors(json))
  }
  dispatch(stopBinUpload())
}

export function uploadBinary(obj, token) {
 return dispatch => {

   let headers = new Headers({
     'Content-Type': 'application/json',
     'Authorization': 'Token ' + token
   });

   dispatch(startBinUpload());
   dispatch(clearUploadTaskErrors());

   fetch('/api/task/', {
     headers: headers,
     method: 'post',
     body: JSON.stringify(obj)})
     .then(response => response.json())
     .then(json => handleJSON(json, dispatch, token))
 }
}
