import { TOGGLE_LOGIN_MODAL, TOGGLE_TASK_MODAL, TOGGLE_LOGIN_FETCHING, TOGGLE_BIN_UPLOAD,
         SWITCH_BETWEEN_LOGIN_SIGNUP,
         LOGIN_FORM, SIGNUP_FORM, TOGGLE_CRASHREPORT_MODAL} from "../actions/UI"

const initialState = {
  loginModalIsOpen: false,
  taskModalIsOpen: false,
  crashReportModalIsOpen: false,
  loginIsFetching: false,
  binIsUploading: false,
  activeAuthForm: LOGIN_FORM
}

const UI = (state = initialState, action) => {

  switch (action.type) {
    case TOGGLE_LOGIN_MODAL:
      return Object.assign({}, state, {
        loginModalIsOpen: action.isOpen
      });

    case TOGGLE_TASK_MODAL:
        return Object.assign({}, state, {
          taskModalIsOpen: action.isOpen
      });

    case TOGGLE_CRASHREPORT_MODAL:
        return Object.assign({}, state, {
          crashReportModalIsOpen: action.isOpen
      });        

    case TOGGLE_LOGIN_FETCHING:
      return Object.assign({}, state, {
        loginIsFetching: action.isFetching
      });

    case SWITCH_BETWEEN_LOGIN_SIGNUP:
      return Object.assign({}, state, {
        activeAuthForm: action.target
      });

    case TOGGLE_BIN_UPLOAD:
      return Object.assign({}, state, {binIsUploading: action.isFetching})

    default:
      return state;
  }
}

export default UI
