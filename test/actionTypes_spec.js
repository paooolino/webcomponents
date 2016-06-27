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
    
});
