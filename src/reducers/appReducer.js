import {
    SET_WINDOW_HEIGHT,
    CHANGE_LANGUAGE,
    GET_LANG_INFOS_REQUEST, GET_LANG_INFOS_FAILURE, GET_LANG_INFOS_SUCCESS
} from '../actions/appActions';

const initialState = {
    windowHeight: 0,
    isFetching: false,
    statusMessage: '',
    languages: [],
    selectedLanguage: ''
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
                fetchingDescription: 'Requesting language informations...',
                isFetching: true,
                fetchingErrorMessage: ''
            };
            
        case GET_LANG_INFOS_FAILURE:
            return {
                ...state,
                fetchingDescription: '',
                isFetching: false,
                fetchingErrorMessage: action.payload.errorMessage
            };            
            
        case GET_LANG_INFOS_SUCCESS:
             return {
                ...state,
                fetchingDescription: '',
                isFetching: false,
                fetchingErrorMessage: '',
                langInfos: action.payload.langInfos
            };       
            
        default:
            return state;
    }    
}

