import {
    SET_WINDOW_HEIGHT,
    GET_LANG_INFOS_REQUEST, GET_LANG_INFOS_FAILURE, GET_LANG_INFOS_SUCCESS
} from '../actions/appActions';

const initialState = {
    windowHeight: 0,
    isFetching: false,
    errorMessage: '',
    langInfos: {}
};

export default function items(state=initialState, action) {
    switch (action.type) {
        case SET_WINDOW_HEIGHT:
            return {
                ...state,
                windowHeight: action.payload.h
            };    
            
        case GET_LANG_INFOS_REQUEST:
            return {
                ...state,
                isFetching: true,
                errorMessage: ''
            };
            
        case GET_LANG_INFOS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload.errorMessage
            };            
            
        case GET_LANG_INFOS_SUCCESS:
             return {
                ...state,
                isFetching: false,
                errorMessage: '',
                langInfos: action.payload.langInfos
            };       
            
        default:
            return state;
    }    
}

