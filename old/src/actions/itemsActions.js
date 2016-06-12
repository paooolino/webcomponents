import { createAsyncAction } from './utils.js';

export const SELECT_ITEM = 'SELECT_ITEM';
export const FETCH_ITEMS_REQUEST = 'FETCH_ITEMS_REQUEST';
export const FETCH_ITEMS_FAILURE = 'FETCH_ITEMS_FAILURE';
export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const SAVE_ITEM_FIELD_REQUEST = 'SAVE_ITEM_FIELD_REQUEST';
export const SAVE_ITEM_FIELD_FAILURE = 'SAVE_ITEM_FIELD_FAILURE';
export const SAVE_ITEM_FIELD_SUCCESS = 'SAVE_ITEM_FIELD_SUCCESS';

const selectItem = (id) => {
    return {
        type: SELECT_ITEM,
        id
    }
}

const fetchItems = () => {
    return createAsyncAction(
        "fetchItems",
        {},
        FETCH_ITEMS_REQUEST, FETCH_ITEMS_FAILURE, FETCH_ITEMS_SUCCESS
    );
}

const addItem = () => {
    return createAsyncAction(
        "addItem",
        {},
        ADD_ITEM_REQUEST, ADD_ITEM_FAILURE, ADD_ITEM_SUCCESS
    );
}

const deleteItem = () => {
    return createAsyncAction(
        "deleteItem",
        {},
        DELETE_ITEM_REQUEST, DELETE_ITEM_FAILURE, DELETE_ITEM_SUCCESS
    );
}

const saveItemField = () => {
    return createAsyncAction(
        "saveItemField",
        {},
        SAVE_ITEM_FIELD_REQUEST, SAVE_ITEM_FIELD_FAILURE, SAVE_ITEM_FIELD_SUCCESS
    );
}

export { fetchItems }
export { selectItem }
export { addItem }
export { deleteItem }
export { saveItemField }
