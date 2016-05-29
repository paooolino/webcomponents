import {
    SET_WINDOW_HEIGHT,
    GET_LANG_INFOS_REQUEST, GET_LANG_INFOS_FAILURE, GET_LANG_INFOS_SUCCESS
} from '../actions/appActions';

const initialState = {
    // the browser window height. 
    // May be used by various components to adjust their height according to this.
    windowHeight: 0,
    // tell if the app is fetching data from server.
    isFetching: false,
    // tell a description of the current fetching.
    fetchingDescription: '',
    // tell if there was an error while fetching.
    fetchingErrorMessage: '',
    // the App language infos gathered from the first server fetch.
    langInfos: {
        languages: [],
        main_language: ''
    }
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

