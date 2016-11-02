import { TOGGLE_LOGIN_MODAL, TOGGLE_LOGIN_FETCHING } from "../actions/UI"

const initialState = {
  loginModalIsOpen: false,
  loginIsFetching: false
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

    default:
      return state;
  }
}

export default UI
