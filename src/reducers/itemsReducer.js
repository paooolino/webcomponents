import {
    FETCHITEMS_REQUEST, FETCHITEMS_FAILURE, FETCHITEMS_SUCCESS,
    ADDITEM_REQUEST, ADDITEM_FAILURE, ADDITEM_SUCCESS,
    DELETEITEM_REQUEST, DELETEITEM_FAILURE, DELETEITEM_SUCCESS,
    SAVEITEMFIELD_REQUEST, SAVEITEMFIELD_FAILURE, SAVEITEMFIELD_SUCCESS,
    SELECT_ITEM, EXPAND_ITEM, UPDATE_ITEM_FIELD
} from '../actions/itemsActions';

const initialState = {
    isFetching: false,
    items: [],
    //item: {},
    parent: {},
    errorMessage: '',
    selected_id: 0,
    selected_id_parent: 0,
    last_added_id: 0,
    last_deleted_id: 0,
    invalidated: true
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
                parent: action.payload.parent,
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
            
            
        
        
        case SAVEITEMFIELD_REQUEST:
            return {
                ...state,
                isFetching: true,
                errorMessage: ''
            };
            
        case SAVEITEMFIELD_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload.errorMessage
            };
            
        case SAVEITEMFIELD_SUCCESS:
            return {
                ...state,
                isFetching: false,
                errorMessage: '',
                invalidated: true
            };
            
            
            
            
        case SELECT_ITEM:
            return {
                ...state,
                selected_id: action.payload.id
            };
            
        case EXPAND_ITEM:
            return {
                ...state,
                selected_id_parent: action.payload.id,
                invalidated: true
            };
            
        case UPDATE_ITEM_FIELD:
            return {
                ...state,
                items: state.items.map((item) => {
                    if(item.id == state.selected_id) {
                        item[action.payload.name] = action.payload.value; 
                    }
                    return item;
                })
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

