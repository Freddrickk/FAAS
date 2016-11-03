import { TOGGLE_LOGIN_MODAL, TOGGLE_LOGIN_FETCHING,
         SWITCH_BETWEEN_LOGIN_SIGNUP,
         LOGIN_FORM, SIGNUP_FORM} from "../actions/UI"

const initialState = {
  loginModalIsOpen: false,
  loginIsFetching: false,
  activeAuthForm: LOGIN_FORM
}

const UI = (state = initialState, action) => {

  switch (action.type) {
    case TOGGLE_LOGIN_MODAL:
      return Object.assign({}, state, {
        loginModalIsOpen: action.isOpen
      });

    case TOGGLE_LOGIN_FETCHING:
      return Object.assign({}, state, {
        loginIsFetching: action.isFetching
      });

    case SWITCH_BETWEEN_LOGIN_SIGNUP:
      return Object.assign({}, state, {
        activeAuthForm: action.target
      });

    default:
      return state;
  }
}

export default UI
