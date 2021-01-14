import { NOT_LOGGED_IN } from "./types";

export function logout(isLoggedIn) {
    return (dispatch) => {
        dispatch(logOut(isLoggedIn))
    };
}

const logOut = (isLoggedIn) => {
    return {
        type: NOT_LOGGED_IN,
        payload: {
            isLoggedIn,
        },
    };
};