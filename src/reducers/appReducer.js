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

export default function(state=initialState, action) {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            return {
                ...state,
                selectedLanguage: action.newLang
            };
            
        case SET_WINDOW_HEIGHT:
            return {
                ...state,
                windowHeight: action.payload.h
            };    
            
        case GET_LANG_INFOS_REQUEST:
            return {
                ...state
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
                languages: action.payload.langInfos,
                selectedLanguage: action.payload.langInfos[0].language
            };       
            
        default:
            return state;
    }    
}

