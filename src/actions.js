import { createAsyncAction } from './utils';

export const types = {
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    LOGOUT: 'LOGOUT',
    SELECT_ITEM: 'SELECT_ITEM',
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    GET_LANGUAGES_REQUEST: 'GET_LANGUAGES_REQUEST',
    GET_LANGUAGES_FAILURE: 'GET_LANGUAGES_FAILURE',
    GET_LANGUAGES_SUCCESS: 'GET_LANGUAGES_SUCCESS',
    FETCH_ITEMS_REQUEST: 'FETCH_ITEMS_REQUEST',
    FETCH_ITEMS_FAILURE: 'FETCH_ITEMS_FAILURE',
    FETCH_ITEMS_SUCCESS: 'FETCH_ITEMS_SUCCESS',
    ADD_ITEM_REQUEST: 'ADD_ITEM_REQUEST',
    ADD_ITEM_FAILURE: 'ADD_ITEM_FAILURE',
    ADD_ITEM_SUCCESS: 'ADD_ITEM_SUCCESS',
    DELETE_ITEM_REQUEST: 'DELETE_ITEM_REQUEST',
    DELETE_ITEM_FAILURE: 'DELETE_ITEM_FAILURE',
    DELETE_ITEM_SUCCESS: 'DELETE_ITEM_SUCCESS',
    SAVE_ITEM_FIELD_REQUEST: 'SAVE_ITEM_FIELD_REQUEST',
    SAVE_ITEM_FIELD_FAILURE: 'SAVE_ITEM_FIELD_FAILURE',
    SAVE_ITEM_FIELD_SUCCESS: 'SAVE_ITEM_FIELD_SUCCESS'
};

const changeLanguage = (newLanguage) => ({
    type: types.CHANGE_LANGUAGE,
    newLanguage
});

const logout = () => ({
    type: types.LOGOUT
});
    
const selectItem = (item_id) => ({
    type: types.SELECT_ITEM,
    item_id
});

const loginRequest = () => ({
    type: types.LOGIN_REQUEST
});
    
const loginFailure = (errorMessage) => ({
    type: types.LOGIN_FAILURE,
    errorMessage
});

const loginSuccess = () => ({
    type: types.LOGIN_SUCCESS
});

const login = (username, password) => {
    return createAsyncAction(
        'login',
        {username, password},
        loginRequest, loginFailure, loginSuccess
    );
};

const getLanguagesRequest = () => ({
    type: types.GET_LANGUAGES_REQUEST
});

const getLanguagesFailure = (errorMessage) => ({
    type: types.GET_LANGUAGES_FAILURE,
    errorMessage
});
    
const getLanguagesSuccess = (serverData) => {
    return {
        type: types.GET_LANGUAGES_SUCCESS,
        ...serverData
    }
};

const getLanguages = () => {
    return createAsyncAction(
        'getLanguages',
        {},
        getLanguagesRequest, getLanguagesFailure, getLanguagesSuccess
    );
};

const fetchItemsRequest = () => ({
    type: types.FETCH_ITEMS_REQUEST
});

const fetchItemsFailure = (errorMessage) => ({
    type: types.FETCH_ITEMS_FAILURE,
    errorMessage
});

const fetchItemsSuccess = (serverData) => ({
    type: types.FETCH_ITEMS_SUCCESS,
    ...serverData
});

const fetchItems = () => {
    return createAsyncAction(
        'fetchItems',
        {},
        fetchItemsRequest, fetchItemsFailure, fetchItemsSuccess
    );
};
    
const addItemRequest = () => ({
    type: types.ADD_ITEM_REQUEST
});

const addItemFailure = (errorMessage) => ({
    type: types.ADD_ITEM_FAILURE,
    errorMessage
});

const addItemSuccess = () => ({
    type: types.ADD_ITEM_SUCCESS
});

const addItem = () => {
    return createAsyncAction(
        'addItem',
        {},
        addItemRequest, addItemFailure, addItemSuccess
    );
};
    
const deleteItemRequest = () => ({
    type: types.DELETE_ITEM_REQUEST
});
    
const deleteItemFailure = (errorMessage) => ({
    type: types.DELETE_ITEM_FAILURE,
    errorMessage
});
    
const deleteItemSuccess = () => ({
    type: types.DELETE_ITEM_SUCCESS
});
    
const deleteItem = () => {
    return createAsyncAction(
        'deleteItem',
        {},
        deleteItemRequest, deleteItemFailure, deleteItemSuccess
    );
};
 
const saveItemFieldRequest = () => ({
    type: types.SAVE_ITEM_FIELD_REQUEST
});

const saveItemFieldFailure = (errorMessage) => ({
    type: types.SAVE_ITEM_FIELD_FAILURE,
    errorMessage
});

const saveItemFieldSuccess = () => ({
    type: types.SAVE_ITEM_FIELD_SUCCESS
});

const saveItemField = () => {
    return createAsyncAction(
        'saveItemField',
        {},
        saveItemFieldRequest, saveItemFieldFailure, saveItemFieldSuccess
    );
};

export const creators = {
    changeLanguage,
    logout,
    selectItem,
    loginRequest,
    loginFailure,
    loginSuccess,
    login,
    getLanguagesRequest,
    getLanguagesFailure,
    getLanguagesSuccess,
    getLanguages,
    fetchItemsRequest,
    fetchItemsFailure,
    fetchItemsSuccess,
    fetchItems,
    addItemRequest,
    addItemFailure,
    addItemSuccess,
    addItem,
    deleteItemRequest,
    deleteItemFailure,
    deleteItemSuccess,
    deleteItem,
    saveItemFieldRequest,
    saveItemFieldFailure,
    saveItemFieldSuccess,
    saveItemField
};

