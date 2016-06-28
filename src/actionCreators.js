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

export const changeUsername = (newValue) => ({
    type: types.CHANGE_USERNAME,
    newValue
});

export const changePassword = (newValue) => ({
    type: types.CHANGE_PASSWORD,
    newValue
});

export const getLanguagesRequest = () => ({
    type: types.GET_LANGUAGES_REQUEST
});

export const getLanguagesFailure = (errorMessage) => ({
    type: types.GET_LANGUAGES_FAILURE,
    errorMessage: 'Get languages failure: ' + errorMessage
});

export const getLanguagesSuccess = (serverData) => ({
    type: types.GET_LANGUAGES_SUCCESS,
    ...serverData
});

export const getLanguages = () => {
    return createAsyncAction(
        'getLanguages',
        {},
        getLanguagesRequest, getLanguagesFailure, getLanguagesSuccess
    );
};
