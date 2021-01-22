import sendRequest from './sendRequest'

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
        console.log(data);
        dispatch(fetchUserSuccess(data));
      })
      .catch((e) => {
        // dispatch(fetchUserFailure(e.message));
      });
  };
};
// export const loading = () => {
//   return (dispatch) => {
//     dispatch(fetchUserRequest());
//   };
// };
const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const fetchUserSuccess = (data) => {
  console.log("*****", data);
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
