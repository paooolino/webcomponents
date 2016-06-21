import expect from 'expect';

import * as types from '../src/actionTypes';
import reducer, { initialState } from '../src/reducer';

describe('[reducer_spec]', () => {
    
    it('should handle LOGIN action', () => {

        const nextState = reducer({
            ...initialState,
            isAuthenticated: false
        }, {
            type: types.LOGIN
        });
        expect(nextState).toBe({});
        
    });
    
});
