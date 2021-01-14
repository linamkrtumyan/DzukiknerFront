import { LOGGED_IN, NOT_LOGGED_IN } from "../actions/types";

const initialState = {
  isLoggedIn: false
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
      case LOGGED_IN:
        return {
          ...state,
          isLoggedIn: action.payload.isLoggedIn
        };
      case NOT_LOGGED_IN:
        return {
          ...state,
          isLoggedIn: action.payload.isLoggedIn
        };
      default:
        return state;
  }
}

export default authReducer;