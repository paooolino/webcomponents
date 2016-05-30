import { createAsyncAction } from './utils.js';

//
// to be used by the reducer
//
export const SET_WINDOW_HEIGHT = 'SET_WINDOW_HEIGHT';
export const GET_LANG_INFOS_REQUEST = 'GET_LANG_INFOS_REQUEST';
export const GET_LANG_INFOS_FAILURE = 'GET_LANG_INFOS_FAILURE';
export const GET_LANG_INFOS_SUCCESS = 'GET_LANG_INFOS_SUCCESS';

//
// action creators
//
const setWindowHeight = (h) => ({
    type: SET_WINDOW_HEIGHT,
    payload: {
        h
    }
});

const getLangInfos = () => {
    return createAsyncAction(
        "getLangInfos",
        {},
        GET_LANG_INFOS_REQUEST, GET_LANG_INFOS_FAILURE, GET_LANG_INFOS_SUCCESS
    );
};

//
// to be used by components
//
export { setWindowHeight };
export { getLangInfos };