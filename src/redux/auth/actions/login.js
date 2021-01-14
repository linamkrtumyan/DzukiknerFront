import { LOGGED_IN } from "./types";

export function login(isLoggedIn) {
    return (dispatch) => {
        dispatch(logIn(isLoggedIn))
    };
}

const logIn = (isLoggedIn) => {
    return {
        type: LOGGED_IN,
        payload: {
            isLoggedIn,
        },
    };
};