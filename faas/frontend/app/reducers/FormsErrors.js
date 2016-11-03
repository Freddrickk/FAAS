import { SET_LOGIN_ERROR, CLEAR_LOGIN_ERROR,
         SET_UPLOAD_TASK_ERROR, CLEAR_UPLOAD_TASK_ERROR} from "../actions/FormsErrors"

const initialState = {
  loginForm: {},
  taskUpload: {}
}

const FormsErrors = (state = initialState, action) => {

  switch (action.type) {
    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginForm: action.errors
      });

    case CLEAR_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginForm: {}
      });

    case SET_UPLOAD_TASK_ERROR:
    return Object.assign({}, state, {
      taskUpload: action.errors
    });

    case CLEAR_UPLOAD_TASK_ERROR:
    return Object.assign({}, state, {
      taskUpload: {}
    });

    default:
      return state;
  }
}

export default FormsErrors
