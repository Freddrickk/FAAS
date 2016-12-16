export const FETCH_FUZZING_TASKS = "FETCH_FUZZING_TASKS";
export const UPDATE_TASK_LIST = "UPDATE_TASK_LIST";
export const FETCH_FUZZING_TASKS_ERROR = "FETCH_FUZZING_TASKS_ERROR";
export const FETCH_FUZZING_DETAIL_TASK = "FETCH_FUZZING_DETAIL_TASK";
export const UPDATE_FUZZING_DETAIL_TASK = "UPDATE_FUZZING_DETAIL_TASK";

export const updateTaskList = (newTaskList) => {
  return {
    type: UPDATE_TASK_LIST,
    newList: newTaskList
  }
}

export const updateTaskDetail = (newTaskDetail) => {
  return {
    type: UPDATE_FUZZING_DETAIL_TASK,
    newTaskDetail: newTaskDetail
  }
}

const handleListJSON = (json, dispatch) => {
  dispatch(updateTaskList(json))
}

const handleDetailJSON = (json, dispatch) => {
  dispatch(updateTaskDetail(json))
}

export function fetchTaskList(token) {
 return dispatch => {

   let headers = new Headers({
     'Content-Type': 'application/json',
     'Authorization': 'Token ' + token
   });

   fetch('/api/task/', {
     headers: headers,
     method: 'get'})
     .then(response => response.json())
     .then(json => handleListJSON(json, dispatch))
 }
}

 export function fetchTaskDetail(token, idTask) {
  return dispatch => {
    let headers = new Headers({
     'Content-Type': 'application/json',
     'Authorization': 'Token ' + token
    });

   fetch('/api/task/'+idTask+'/', {
     headers: headers,
     method: 'get'})
     .then(response => response.json())
     .then(json => handleDetailJSON(json, dispatch))
 }
}

export function fetchKillTask(token, idTask) {
 return dispatch => {
   let headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
   });

  fetch('/api/task/'+idTask+'/', {
    headers: headers,
    method: 'delete'})
    .then(response => response.json())
}
}
