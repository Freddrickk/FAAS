export const FETCH_REPORTS_LIST = "FETCH_REPORTS_LIST";
export const UPDATE_REPORTS_LIST = "UPDATE_REPORTS_LIST";

export const updateReportsList = (newReportsList) => {
  return {
    type: UPDATE_REPORTS_LIST,
    newList: newReportsList
  }
}

const handleJSON = (json, dispatch) => {
  dispatch(updateReportsList(json))
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
     .then(json => handleJSON(json, dispatch))
 }
}
