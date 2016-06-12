import {
    CHANGE_LANGUAGE,
    GET_LANGUAGES_REQUEST,
    GET_LANGUAGES_FAILURE,
    GET_LANGUAGES_SUCCESS
} from '../actions/appActions.js';

const initialState = {
    nFetching: 0,
    statusMessage: '',
    languages: [],
    selectedLanguage: ''
};

export default function(state=initialState, action) {
    switch (action.type) {
        case GET_LANGUAGES_REQUEST:
            return {
                ...state,
                nFetching: state.nFetching + 1,
                statusMessage: 'Requesting languages',
                languages: [],
                selectedLanguage: ''
            };
            
        case GET_LANGUAGES_FAILURE:
            return {
                ...state,
                nFetching: state.nFetching - 1,
                statusMessage: 'Error in requesting languages: ' + action.errorMessage,
                languages: [],
                selectedLanguage: ''
            };
        
        case GET_LANGUAGES_SUCCESS:
            const languages = action.languages.map((language) => {
                return language.lang
            });
            const selectedLanguage = languages[0];
            return {
                ...state,
                nFetching: state.nFetching - 1,
                statusMessage: 'Languages loaded.',
                languages,
                selectedLanguage
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
