import expect from 'expect';
import * as actions from '../actions/appActions';
import reducer from '../reducers/appReducer';

describe('App reducer', () => {
    
    it('should handle getlanguageInfosRequest', () => {
        const state = {
            nFetching: 0,
            statusMessage: '',
            languages: [],
            selectedLanguage: ''
        };
        const nextState = reducer(state, actions.getlanguageInfosRequest);
        const expectedState = {
            nFetching: 1,
            statusMessage: 'Requesting languages',
            languages: [],
            selectedLanguage: ''
        };
        expect(nextState).toEqual(expectedState);
    });

    it('should handle getlanguageInfosFailure', () => {
        const state = {
            nFetching: 1,
            statusMessage: 'Requesting languages',
            languages: [],
            selectedLanguage: ''
        };
        const errorMessage = 'An unspecified error occurred.';
        const nextState = reducer(state, actions.getlanguageInfosFailure(errorMessage));
        const expectedState = {
            nFetching: 0,
            statusMessage: 'Error in requesting languages: ' + errorMessage,
            languages: [],
            selectedLanguage: ''
        };        
        expect(nextState).toEqual(expectedState);        
    });

    it('should handle getLanguageInfosSuccess', () => {
        const state = {
            nFetching: 1,
            statusMessage: 'Requesting languages',
            languages: [],
            selectedLanguage: ''
        };
        const languageInfos = {
            languageInfos: [{ lang: 'it' }, { lang: 'en' }]
        };
        const nextState = reducer(state, actions.getlanguageInfosSuccess(languageInfos));
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
                languages: ['it', 'en'],
                selectedLanguage: 'it'
            };
            const newLanguage = 'en';
            const nextState = reducer(state, actions.changeLanguage(newLanguage));
            const expectedState = {
                nFetching: 0,
                statusMessage: 'Language was changed to ' + newLanguage,
                languages: ['it', newLanguage],
                selectedLanguage: newLanguage
            };        
            expect(nextState).toEqual(expectedState);         
        });  

        it('should not change a language if not present in the available languages', () => {
            const state = {
                languages: ['it', 'en'],
                selectedLanguage: 'it'
            };
            const newLanguage = 'de';
            const nextState = reducer(state, actions.changeLanguage(newLanguage));
            const expectedState = {
                nFetching: 0,
                statusMessage: 'Failed change to unavailable language ' + newLanguage,
                languages: ['it', 'en'],
                selectedLanguage: 'it'
            };        
            expect(nextState).toEqual(expectedState);         
        });        
    });

});