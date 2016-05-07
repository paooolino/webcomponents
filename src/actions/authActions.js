import {API_ENDPOINT, createAsyncAction} from './utils.js';



//
// to be used by the reducer
//
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT = 'LOGOUT';



//
// action creators
//
const login = (username, password) => {
    return createAsyncAction(
        "login",
        { username, password },
        LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS
    );
};

const logout = () => {
    return {
        type: LOGOUT
    };
};



//
// to be used by components
//
export { login };
export { logout };
