import expect from 'expect';
import reducer from '../../src/App/appReducer';
import {changeLanguage, logout} from '../../src/App/AppActions';
import {getLanguagesRequest, getLanguagesFailure, getLanguagesSuccess} from '../../src/App/AppActions';

const initialState = {
    nFetching: 0,
    statusMessage: '',
    languages: [],
    selectedLanguage: '',
    isLogged: false
};

describe('App reducer', () => {
    
    it('should handle getLanguagesRequest', () => {
        const state = {...initialState}
        const nextState = reducer(state, getLanguagesRequest());
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
        const errorMessage = 'An unspecified error occurred.';
        const nextState = reducer(state, getLanguagesFailure(errorMessage));
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
        const nextState = reducer(state, getLanguagesSuccess(serverData));
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
            isLogged: true
        }
        const nextState = reducer(state, logout());
        const expectedState = {
            ...state,
            isLogged: false
        };
        expect(nextState).toEqual(expectedState);        
    });
    
    describe('changeLanguage', () => {
        
        it('should change a language if present in the available languages', () => {
            const state = {...initialState, languages: ['it', 'en']}
            const newLanguage = 'en';
            const nextState = reducer(state, changeLanguage(newLanguage));
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
            const nextState = reducer(state, changeLanguage(newLanguage));
            const expectedState = {
                ...state,
                statusMessage: 'Failed change to unavailable language ' + newLanguage,
                selectedLanguage: ''
            };        
            expect(nextState).toEqual(expectedState);
        });
        
    });

});
