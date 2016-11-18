import { SET_BINARY_FILE, CLEAR_BINARY_FILE,
         SET_BINARY_NAME, CLEAR_BINARY_NAME } from '../actions/Task'

const initialState = {
  b64_binary_file: "",
  binaryName: ""
}

const Task = (state = initialState, action) => {

  switch (action.type) {
    case SET_BINARY_FILE:
      return Object.assign({}, state, {
          b64_binary_file: action.b64String
      });

    case CLEAR_BINARY_FILE:
      return Object.assign({}, state, {
        b64_binary_file: ""
      });

      case SET_BINARY_NAME:
        return Object.assign({}, state, {
          binaryName: action.name
        });

      case CLEAR_BINARY_NAME:
        return Object.assign({}, state, {
          binaryName: action.name
        });

    default:
      return state;

  }
}

export default Task;
