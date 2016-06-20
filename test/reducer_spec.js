/*
    external imports
*/
import expect from 'expect';

/*
    internal imports
*/
import reducer from '../src/reducer';
import { types } from '../src/actions';

const initialState = {
    selectedLanguage: '',
    isAuthenticated: false
};

describe('[reducer_spec]', () => {
    
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    
    it('should handle CHANGE_LANGUAGE', () => {
        const state = {...initialState};
        const nextState = reducer(state, {
            type: types.CHANGE_LANGUAGE,
            newLanguage: 'it'
        });
        const expectedState = {
            ...state,
            selectedLanguage: 'it'
        };
        expect(nextState).toEqual(expectedState);
    });
    
    it('should handle LOGOUT', () => {
        const state = {
            ...initialState,
            isAuthenticated: true
        };
        const nextState = reducer(state, {
            type: types.LOGOUT
        });
        const expectedState = {
            ...state,
            isAuthenticated: false
        };
        expect(nextState).toEqual(expectedState);
    });
    
});
