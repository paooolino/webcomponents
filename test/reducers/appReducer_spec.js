import expect from 'expect';
import * as actions from '../../src/actions/appActions';
import reducer from '../../src/reducers/appReducer';

describe('App reducer', () => {
    
    it('should handle getlanguagesRequest', () => {
        const state = {
            nFetching: 0,
            statusMessage: '',
            languages: [],
            selectedLanguage: ''
        };
        const nextState = reducer(state, actions.getLanguagesRequest());
        const expectedState = {
            nFetching: 1,
            statusMessage: 'Requesting languages',
            languages: [],
            selectedLanguage: ''
        };
        expect(nextState).toEqual(expectedState);
    });

    it('should handle getLanguagesFailure', () => {
        const state = {
            nFetching: 1,
            statusMessage: 'Requesting languages',
            languages: [],
            selectedLanguage: ''
        };
        const errorMessage = 'An unspecified error occurred.';
        const nextState = reducer(state, actions.getLanguagesFailure(errorMessage));
        const expectedState = {
            nFetching: 0,
            statusMessage: 'Error in requesting languages: ' + errorMessage,
            languages: [],
            selectedLanguage: ''
        };        
        expect(nextState).toEqual(expectedState);        
    });

    it('should handle getLanguagesSuccess', () => {
        const state = {
            nFetching: 1,
            statusMessage: 'Requesting languages',
            languages: [],
            selectedLanguage: ''
        };
        const languages = {
            languages: [{ lang: 'it' }, { lang: 'en' }]
        };
        const nextState = reducer(state, actions.getLanguagesSuccess(languages));
        const expectedState = {
            nFetching: 0,
            statusMessage: 'Languages loaded.',
            languages: ['it', 'en'],
            selectedLanguage: 'it'
        };        
        expect(nextState).toEqual(expectedState);       
    });
    
    describe('changeLanguage', () => {
        it('should change a language if present in the available languages', () => {
            const state = {
                statusMessage: '',
                languages: ['it', 'en'],
                selectedLanguage: 'it'
            };
            const newLanguage = 'en';
            const nextState = reducer(state, actions.changeLanguage(newLanguage));
            const expectedState = {
                statusMessage: 'Language was changed to ' + newLanguage,
                languages: ['it', 'en'],
                selectedLanguage: newLanguage
            };        
            expect(nextState).toEqual(expectedState);         
        });  

        it('should not change a language if not present in the available languages', () => {
            const state = {
                statusMessage: '',
                languages: ['it', 'en'],
                selectedLanguage: 'it'
            };
            const newLanguage = 'de';
            const nextState = reducer(state, actions.changeLanguage(newLanguage));
            const expectedState = {
                statusMessage: 'Failed change to unavailable language ' + newLanguage,
                languages: ['it', 'en'],
                selectedLanguage: 'it'
            };        
            expect(nextState).toEqual(expectedState);         
        });        
    });

});

