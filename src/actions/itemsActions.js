import {API_ENDPOINT, createAsyncAction} from './utils.js';



//
// to be used by the reducer
//
export const FETCHITEMS_REQUEST = 'FETCHITEMS_REQUEST';
export const FETCHITEMS_FAILURE = 'FETCHITEMS_FAILURE';
export const FETCHITEMS_SUCCESS = 'FETCHITEMS_SUCCESS';

export const ADDITEM_REQUEST = 'ADDITEM_REQUEST';
export const ADDITEM_FAILURE = 'ADDITEM_FAILURE';
export const ADDITEM_SUCCESS = 'ADDITEM_SUCCESS';

export const DELETEITEM_REQUEST = 'DELETEITEM_REQUEST';
export const DELETEITEM_FAILURE = 'DELETEITEM_FAILURE';
export const DELETEITEM_SUCCESS = 'DELETEITEM_SUCCESS';

export const SELECT_ITEM = 'SELECT_ITEM';
export const UPDATE_ITEM_FIELD = 'UPDATE_ITEM_FIELD';

export const SAVEITEMFIELD_REQUEST = 'SAVEITEMFIELD_REQUEST';
export const SAVEITEMFIELD_FAILURE = 'SAVEITEMFIELD_FAILURE'; 
export const SAVEITEMFIELD_SUCCESS = 'SAVEITEMFIELD_SUCCESS';



//
// action creators
//
const fetchItems = (id_parent, lang, offset, howmany, filter, search, orderby) => {
    return createAsyncAction(
        "fetchItems",
        { id_parent, lang, offset, howmany, filter, search, orderby },
        FETCHITEMS_REQUEST, FETCHITEMS_FAILURE, FETCHITEMS_SUCCESS
    );
};

const addItem = (id_parent, lang) => {
    return createAsyncAction(
        "addItem",
        { id_parent, lang },
        ADDITEM_REQUEST, ADDITEM_FAILURE, ADDITEM_SUCCESS
    );
};

const deleteItem = (id) => {
    return createAsyncAction(
        "deleteItem",
        { id },
        DELETEITEM_REQUEST, DELETEITEM_FAILURE, DELETEITEM_SUCCESS
    );
};

const saveItemField = (id, name, value) => {
    return createAsyncAction(
        "saveItemField",
        { id, name, value },
        SAVEITEMFIELD_REQUEST, SAVEITEMFIELD_FAILURE, SAVEITEMFIELD_SUCCESS
    );
};

const selectItem = (id) => ({
    type: SELECT_ITEM,
    id
});

const updateItemField = (name, value) => ({
    type: UPDATE_ITEM_FIELD,
    payload: {
        name,
        value
    }
});



//
// to be used by components
//
export { fetchItems };  // this is ES6 syntax to export a function defined earlier
export { addItem };
export { deleteItem };
export { selectItem };
export { updateItemField };
export { saveItemField };
export { setLanguage };
