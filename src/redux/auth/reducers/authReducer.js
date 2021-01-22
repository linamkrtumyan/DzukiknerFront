import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from "../actions/types";

const initialState = {
  token: false,
  error: null,
  ready: false,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: false,
        ready: false
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        ready: true,
        token: action.payload.token,
        error: null,
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        ready: true,
        token: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
