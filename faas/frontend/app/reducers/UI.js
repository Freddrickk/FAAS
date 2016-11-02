import { TOGGLE_LOGIN_MODAL } from "../actions/UI"

const initialState = {
  loginModalIsOpen: false
}

const UI = (state = initialState, action) => {

  console.log(action);

  switch (action.type) {
    case TOGGLE_LOGIN_MODAL:
      return Object.assign({}, state, {
        loginModalIsOpen: action.isOpen
      });
    default:
      return state;
  }
}

export default UI
