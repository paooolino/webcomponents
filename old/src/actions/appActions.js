import { createAsyncAction } from './utils.js';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const GET_LANGUAGES_REQUEST = 'GET_LANGUAGES_REQUEST';
export const GET_LANGUAGES_FAILURE = 'GET_LANGUAGES_FAILURE';
export const GET_LANGUAGES_SUCCESS = 'GET_LANGUAGES_SUCCESS';

const changeLanguage = (newLanguage) => ({
    type: CHANGE_LANGUAGE,
    newLanguage
});

const getLanguagesRequest = () => ({
    type: GET_LANGUAGES_REQUEST
});

const getLanguagesFailure = (errorMessage) => ({
    type: GET_LANGUAGES_FAILURE,
    errorMessage
});

const getLanguagesSuccess = (languages) => ({
    type: GET_LANGUAGES_SUCCESS,
    ...languages
});

const getLanguages = () => {
    return createAsyncAction(
        "getLanguages",
        getLanguagesRequest, getLanguagesFailure, getLanguagesSuccess
    );
};

export { changeLanguage };
export { getLanguagesRequest };
export { getLanguagesFailure };
export { getLanguagesSuccess };
export { getLanguages };
