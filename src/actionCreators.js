/*
    external imports
*/

/*
    internal imports
*/

import { createAsyncAction } from './utils';
import * as types from './actionTypes';

export const loginRequest = () => ({
    type: types.LOGIN_REQUEST
});

export const loginFailure = (errorMessage) => ({
    type: types.LOGIN_FAILURE,
    errorMessage: 'Login failure: ' + errorMessage
});

export const loginSuccess = (serverData) => ({
    type: types.LOGIN_SUCCESS,
    ...serverData
});

export const login = (username, password) => {
    if( !username || !password ) {
        throw Error('You must provide username and password.');
    }
    return createAsyncAction(
        'login',
        {username, password},
        loginRequest, loginFailure, loginSuccess
    );
};
