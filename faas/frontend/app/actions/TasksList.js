export const FETCH_FUZZING_TASKS = "FETCH_FUZZING_TASKS";
export const UPDATE_TASK_LIST = "UPDATE_TASK_LIST";
export const FETCH_FUZZING_TASKS_ERROR = "FETCH_FUZZING_TASKS_ERROR"

export const updateTaskList = (newTaskList) => {
  return {
    type: UPDATE_TASK_LIST,
    newList: newTaskList
  }
}

const handleJSON = (json, dispatch) => {
  dispatch(updateTaskList(json))
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
     .then(json => handleJSON(json, dispatch))
 }
}
