import {
    FETCHITEMS_REQUEST, FETCHITEMS_FAILURE, FETCHITEMS_SUCCESS,
    ADDITEM_REQUEST, ADDITEM_FAILURE, ADDITEM_SUCCESS,
    DELETEITEM_REQUEST, DELETEITEM_FAILURE, DELETEITEM_SUCCESS,
    SELECT_ITEM
} from '../actions/itemsActions';

const initialState = {
    isFetching: false,
    items: [],
    errorMessage: '',
    selected_id: 0,
    last_added_id: 0,
    last_deleted_id: 0,
    invalidated: false
};

export default function items(state=initialState, action) {
    switch (action.type) {
        case FETCHITEMS_REQUEST:
            return {
                ...state,
                isFetching: true,
                errorMessage: ''
            };
        
        case FETCHITEMS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload.errorMessage
            };
            
        case FETCHITEMS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                items: action.payload.items,
                errorMessage: '',
                invalidated: false
            };
            

            
        case ADDITEM_REQUEST:
            return {
                ...state,
                isFetching: true,
                errorMessage: ''
            };
        
        case ADDITEM_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload.errorMessage
            };
            
        case ADDITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                last_added_id: action.payload.last_added_id,
                errorMessage: '',
                invalidated: true
            };
            
            
            
        case SELECT_ITEM:
            return {
                ...state,
                selected_id: action.payload.id
            };
            
            
            
        case DELETEITEM_REQUEST:
            return {
                ...state,
                isFetching: true,
                errorMessage: ''
            };
        
        case DELETEITEM_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload.errorMessage
            };
            
        case DELETEITEM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                last_deleted_id: action.payload.last_deleted_id,
                errorMessage: '',
                invalidated: true
            };
            
        default:
            return state;
    }    
}

