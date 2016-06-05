import { createAsyncAction } from './utils.js';

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const GET_LANGUAGE_INFOS_REQUEST = 'GET_LANG_INFOS_REQUEST';
export const GET_LANGUAGE_INFOS_FAILURE = 'GET_LANG_INFOS_FAILURE';
export const GET_LANGUAGE_INFOS_SUCCESS = 'GET_LANG_INFOS_SUCCESS';

const changeLanguage = (newLanguage) => ({
    type: CHANGE_LANGUAGE,
    newLanguage
});

const getLanguageInfos = () => {
    return createAsyncAction(
        "getLanguageInfos",
        {},
        GET_LANGUAGE_INFOS_REQUEST, GET_LANGUAGE_INFOS_FAILURE, GET_LANGUAGE_INFOS_SUCCESS
    );
};

export { changeLanguage };
export { getLanguageInfos };
