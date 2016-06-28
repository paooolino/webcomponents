import expect from 'expect';

import * as types from '../src/actionTypes';

describe('[actionTypes_spec]', () => {
    
    it("defines login sync actions", () => {
        expect(types.LOGIN_REQUEST).toBe('LOGIN_REQUEST');
        expect(types.LOGIN_FAILURE).toBe('LOGIN_FAILURE');
        expect(types.LOGIN_SUCCESS).toBe('LOGIN_SUCCESS');
        expect(types.CHANGE_USERNAME).toBe('CHANGE_USERNAME');
        expect(types.CHANGE_PASSWORD).toBe('CHANGE_PASSWORD');
    });
    
    it("defines getLanguages sync action", () => {
        expect(types.GET_LANGUAGES_REQUEST).toBe('GET_LANGUAGES_REQUEST');
        expect(types.GET_LANGUAGES_FAILURE).toBe('GET_LANGUAGES_FAILURE');
        expect(types.GET_LANGUAGES_SUCCESS).toBe('GET_LANGUAGES_SUCCESS');        
        expect(types.SELECT_LANGUAGE).toBe('SELECT_LANGUAGE');        
    });
    
});
