import { createAsyncAction } from '../utils';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const LOGOUT = 'LOGOUT';
export const GET_LANGUAGES_REQUEST = 'GET_LANGUAGES_REQUEST';
export const GET_LANGUAGES_FAILURE = 'GET_LANGUAGES_FAILURE';
export const GET_LANGUAGES_SUCCESS = 'GET_LANGUAGES_SUCCESS';

const changeLanguage = function(newLanguage) {
    return {
        type: CHANGE_LANGUAGE,
        newLanguage
    }
}

const logout = function() {
    return {
        type: LOGOUT
    }
}

const getLanguagesRequest = function() {
    return {
        type: GET_LANGUAGES_REQUEST
    }
}

const getLanguagesFailure = function(errorMessage) {
    return {
        type: GET_LANGUAGES_FAILURE,
        errorMessage
    }
}

const getLanguagesSuccess = function(serverData) {
    return {
        type: GET_LANGUAGES_SUCCESS,
        languages: serverData.languages
    }
}

const getLanguages = function() {
    return createAsyncAction(
        "getLanguages",
        getLanguagesRequest, getLanguagesFailure, getLanguagesSuccess
    );
}

export { changeLanguage };
export { logout };
export { getLanguages };
export { getLanguagesRequest };
export { getLanguagesFailure };
export { getLanguagesSuccess };
