import sendRequest from "./sendRequest";

import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./types";

export const fetchUser = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    sendRequest(`/user/token`)
      .then((data) => {
        dispatch(fetchUserSuccess(data));
      })
      .catch((e) => {
        dispatch(fetchUserFailure(e.message));
      });
  };
};
const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const fetchUserSuccess = (data) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: {
      token: data,
    },
  };
};

const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: { error },
  };
};
