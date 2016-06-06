import { createAsyncAction } from './utils.js';

export const LOGOUT = 'LOGOUT';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const logout = () => ({
    type: LOGOUT
});

const login = (username, password) => {
    return createAsyncAction(
        "login",
        {username, password},
        LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS
    );
};

export { logout };
export { login };
