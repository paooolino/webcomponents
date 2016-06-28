import expect from 'expect';
import * as types from '../src/actionTypes';

describe('[actionTypes_spec]', () => {

    it('defines LOGIN action type(s)', () => {
        expect(types.LOGIN_REQUEST).toBe('LOGIN_REQUEST');
        expect(types.LOGIN_FAILURE).toBe('LOGIN_FAILURE');
        expect(types.LOGIN_SUCCESS).toBe('LOGIN_SUCCESS');
    });

    it('defines CHANGE_FIELD_USERNAME action type(s)', () => {
        expect(types.CHANGE_FIELD_USERNAME).toBe('CHANGE_FIELD_USERNAME');
    });

    it('defines CHANGE_FIELD_PASSWORD action type(s)', () => {
        expect(types.CHANGE_FIELD_PASSWORD).toBe('CHANGE_FIELD_PASSWORD');
    });

    it('defines GET_LANGUAGES action type(s)', () => {
        expect(types.GET_LANGUAGES_REQUEST).toBe('GET_LANGUAGES_REQUEST');
        expect(types.GET_LANGUAGES_FAILURE).toBe('GET_LANGUAGES_FAILURE');
        expect(types.GET_LANGUAGES_SUCCESS).toBe('GET_LANGUAGES_SUCCESS');
    });

    it('defines SELECT_LANGUAGE action type(s)', () => {
        expect(types.SELECT_LANGUAGE).toBe('SELECT_LANGUAGE');
    });

});

