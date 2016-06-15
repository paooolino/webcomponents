import {
    CHANGE_LANGUAGE, LOGOUT,
    GET_LANGUAGES_REQUEST,
    GET_LANGUAGES_FAILURE,
    GET_LANGUAGES_SUCCESS
} from './AppActions.js';

const initialState = {
    nFetching: 0,
    statusMessage: '',
    languages: [],
    selectedLanguage: '',
    isAuthenticated: false
};

export default function(state=initialState, action) {
    switch (action.type) {
        case GET_LANGUAGES_REQUEST:
            return {
                ...state,
                nFetching: state.nFetching + 1,
                statusMessage: 'Requesting languages...'
            };
            
        case GET_LANGUAGES_FAILURE:
            return {
                ...state,
                nFetching: state.nFetching - 1,
                statusMessage: 'Error in requesting languages: ' + action.errorMessage
            };
            
        case GET_LANGUAGES_SUCCESS:
            return {
                ...state,
                nFetching: state.nFetching - 1,
                statusMessage: 'Languages loaded.',
                languages: action.languages
            };
            
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false
            };
            
        case CHANGE_LANGUAGE:
            if( state.languages.indexOf(action.newLanguage) > -1 ) {
                return {
                    ...state,
                    statusMessage: 'Language was changed to ' + action.newLanguage,
                    selectedLanguage: action.newLanguage
                }
            } else {
                return {
                    ...state,
                    statusMessage: 'Failed change to unavailable language ' + action.newLanguage
                }
            }
            
        default:
            return state;
    }
}