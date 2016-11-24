import { FETCH_FUZZING_TASKS, FETCH_FUZZING_TASKS_ERROR,
         UPDATE_TASK_LIST } from '../actions/TasksList'

const initialState = {
	fetching: false,
	fetched: false,
	taskList: [],
	error: null
}

const TasksList = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_FUZZING_TASKS: {
			return {...state, fetching: true}
			break;
		}

		case FETCH_FUZZING_TASKS_ERROR: {
			return {...state, fetching: false, error: action.payload}
			break;
		}

  case UPDATE_TASK_LIST:
    return Object.assign({}, state, {taskList: action.newList})
    break;

  }
  return state
}

export default TasksList;
