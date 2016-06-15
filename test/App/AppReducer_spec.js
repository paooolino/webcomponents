import expect from 'expect';
import reducer from '../../src/App/appReducer';
import {
    CHANGE_LANGUAGE, LOGOUT,
    GET_LANGUAGES_REQUEST,
    GET_LANGUAGES_FAILURE,
    GET_LANGUAGES_SUCCESS
} from '../../src/App/AppActions.js';

const initialState = {
    nFetching: 0,
    statusMessage: '',
    languages: [],
    selectedLanguage: '',
    isAuthenticated: false
};

describe('[App/AppReducer_spec]', () => {
    
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    it('should handle getLanguagesRequest', () => {
        const state = {...initialState}
        const nextState = reducer(state, {
            type: GET_LANGUAGES_REQUEST
        });
        const expectedState = {
            ...state,
            nFetching: 1,
            statusMessage: 'Requesting languages...'
        };
        expect(nextState).toEqual(expectedState);
    });
    it('should handle getLanguagesFailure', () => {
        const state = {
            ...initialState,
            nFetching: 1,
            statusMessage: 'Requesting languages...'
        }
        const errorMessage = '<error description from server>';
        const nextState = reducer(state, {
            type: GET_LANGUAGES_FAILURE,
            errorMessage
        });
        const expectedState = {
            ...state,
            nFetching: 0,
            statusMessage: 'Error in requesting languages: ' + errorMessage
        };
        expect(nextState).toEqual(expectedState);
    });
    it('should handle getLanguagesSuccess', () => {
        const state = {
            ...initialState,
            nFetching: 1,
            statusMessage: 'Requesting languages...'
        }
        const serverData = {
            languages: ['it', 'en']
        }
        const nextState = reducer(state, {
            type: GET_LANGUAGES_SUCCESS,
            languages: serverData.languages
        });
        const expectedState = {
            ...state,
            nFetching: 0,
            statusMessage: 'Languages loaded.',
            languages: serverData.languages
        };
        expect(nextState).toEqual(expectedState);
    });
    it('should handle logout', () => {
        const state = {
            ...initialState,
            isAuthenticated: true
        }
        const nextState = reducer(state, {
            type: LOGOUT
        });
        const expectedState = {
            ...state,
            isAuthenticated: false
        };
        expect(nextState).toEqual(expectedState);        
    });
    
    describe('changeLanguage', () => {
        
        it('should change a language if present in the available languages', () => {
            const state = {...initialState, languages: ['it', 'en']}
            const newLanguage = 'en';
            const nextState = reducer(state, {
                type: CHANGE_LANGUAGE,
                newLanguage
            });
            const expectedState = {
                ...state,
                statusMessage: 'Language was changed to ' + newLanguage,
                selectedLanguage: newLanguage
            };        
            expect(nextState).toEqual(expectedState);             
        });
        it('should not change a language if not present in the available languages', () => {
            const state = {...initialState, languages: ['it', 'en'], selectedLanguage: ''}
            const newLanguage = 'de';
            const nextState = reducer(state, {
                type: CHANGE_LANGUAGE,
                newLanguage
            });
            const expectedState = {
                ...state,
                statusMessage: 'Failed change to unavailable language ' + newLanguage,
                selectedLanguage: ''
            };        
            expect(nextState).toEqual(expectedState);
        });
        
    });

});
