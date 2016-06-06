import { createAsyncAction } from './utils.js';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const GET_LANGUAGE_INFOS_REQUEST = 'GET_LANG_INFOS_REQUEST';
export const GET_LANGUAGE_INFOS_FAILURE = 'GET_LANG_INFOS_FAILURE';
export const GET_LANGUAGE_INFOS_SUCCESS = 'GET_LANG_INFOS_SUCCESS';

const changeLanguage = (newLanguage) => ({
    type: CHANGE_LANGUAGE,
    newLanguage
});

const getLanguageInfosRequest = () => ({
    type: GET_LANGUAGE_INFOS_REQUEST
});

const getLanguageInfosFailure = (errorMessage) => ({
    type: GET_LANGUAGE_INFOS_FAILURE,
    errorMessage
});

const getLanguageInfosSuccess = (languageInfos) => ({
    type: GET_LANGUAGE_INFOS_SUCCESS,
    ...languageInfos
});

const getLanguageInfos = () => {
    return createAsyncAction(
        "getLanguageInfos",
        getLanguageInfosRequest, getLanguageInfosFailure, getLanguageInfosSuccess
    );
};

export { changeLanguage };
export { getLanguageInfosRequest };
export { getLanguageInfosFailure };
export { getLanguageInfosSuccess };
export { getLanguageInfos };
