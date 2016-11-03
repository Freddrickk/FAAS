import { SAVE_TOKEN, SAVE_USERNAME, LOGOUT } from "../actions/User"

const initialState = {
  isConnected: false,
  credentials: {
    token: "",
    username: ""
  }
}

const User = (state = initialState, action) => {

  switch (action.type) {
    case SAVE_TOKEN:
      return Object.assign({}, state, {
        isConnected: true,
        credentials: {token: action.token, username: ""}
      });

    case SAVE_USERNAME:
      let currentState = Object.assign({}, state);
      currentState.credentials.username = action.username;
      return Object.assign({}, state, currentState);

    case LOGOUT:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}

export default User
