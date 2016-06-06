import {
    CHANGE_LANGUAGE,
    GET_LANGUAGE_INFOS_REQUEST,
    GET_LANGUAGE_INFOS_FAILURE,
    GET_LANGUAGE_INFOS_SUCCESS
} from '../actions/appActions.js';

const initialState = {
    nFetching: 0,
    statusMessage: '',
    languages: [],
    selectedLanguage: ''
};

export default function(state=initialState, action) {
    switch (action.type) {
        case GET_LANGUAGE_INFOS_REQUEST:
            return {
                ...state,
                nFetching: state.nFetching + 1,
                statusMessage: 'Requesting languages',
                languages: [],
                selectedLanguage: ''
            };
            
        case GET_LANGUAGE_INFOS_FAILURE:
            return {
                ...state,
                nFetching: state.nFetching - 1,
                statusMessage: 'Error in requesting languages: ' + action.errorMessage,
                languages: [],
                selectedLanguage: ''
            };
        
        case GET_LANGUAGE_INFOS_SUCCESS:
            const languages = action.languageInfos.map((language) => {
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
            
        case CHANGE_LANGUAGE:
            return {};
            
        default:
            return state;
    }
}
