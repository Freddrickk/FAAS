export const FETCH_REPORTS_LIST = "FETCH_REPORTS_LIST";
export const UPDATE_REPORTS_LIST = "UPDATE_REPORTS_LIST";
export const FETCH_CRASH_REPORT_DETAIL = "FETCH_CRASH_REPORT_DETAIL";
export const UPDATE_CRASH_REPORT_DETAIL = "UPDATE_CRASH_REPORT_DETAIL";
export const UPDATE_REGISTERS = "UPDATE_REGISTERS";

export const updateReportsList = (newReportsList) => {
  return {
    type: UPDATE_REPORTS_LIST,
    newList: newReportsList
  }
}

export const updateCrashReportDetail = (newCrashReportDetail) => {
  return {
    type: UPDATE_CRASH_REPORT_DETAIL,
    newCrashReportDetail: newCrashReportDetail
  }
}

export const updateRegisters = (newCurrentRegisters) => {
  return {
    type: UPDATE_REGISTERS,
    newCurrentRegisters: newCurrentRegisters
  }
}

const handleListJSON = (json, dispatch) => {
  dispatch(updateReportsList(json))
}

const handleDetailJSON = (json, dispatch) => {
  dispatch(updateCrashReportDetail(json))
}

const handleRegistersJSON = (json, dispatch) => {
  dispatch(updateRegisters(json))
}

export function fetchReportsList(token) {
 return dispatch => {

   let headers = new Headers({
     'Content-Type': 'application/json',
     'Authorization': 'Token ' + token
   });

   fetch('/api/report/', {
     headers: headers,
     method: 'get'})
     .then(response => response.json())
     .then(json => handleListJSON(json, dispatch))
 }
}

export function fetchCrashReportDetail(token, idCrashReport) {
 return dispatch => {

   let headers = new Headers({
     'Content-Type': 'application/json',
     'Authorization': 'Token ' + token
   });

   fetch('/api/report/'+idCrashReport+'/', {
     headers: headers,
     method: 'get'})
     .then(response => response.json())
     .then(json => handleDetailJSON(json, dispatch))
 }
}

export function fetchRegistersDetail(token, idCrashReport) {
 return dispatch => {

   let headers = new Headers({
     'Content-Type': 'application/json',
     'Authorization': 'Token ' + token
   });

   fetch('/api/registers/'+idCrashReport+'/', {
     headers: headers,
     method: 'get'})
     .then(response => response.json())
     .then(json => handleRegistersJSON(json, dispatch))
 }
}
