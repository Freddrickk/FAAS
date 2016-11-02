import { SET_LOGIN_ERROR, CLEAR_LOGIN_ERROR } from "../actions/FormsErrors"

const initialState = {
  loginForm: {}
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

    default:
      return state;
  }
}

export default FormsErrors
