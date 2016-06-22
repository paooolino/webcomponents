/*
    external imports
*/

import expect from 'expect';

/*
    internal imports
*/

import * as creators from '../src/actionCreators';
import { createAsyncAction } from '../src/utils';
import * as types from '../src/actionTypes';

describe('[actionCreators_spec]', () => {
    
    describe('login', () => {
        
        it('creates the LOGIN_REQUEST action', () => {
            const action = creators.loginRequest();
            expect(action).toEqual({
                type: types.LOGIN_REQUEST
            }); 
        });
        
        it('creates the LOGIN_FAILURE action', () => {
            const serverErrorMessage = 'Whatever error message';
            const action = creators.loginFailure(serverErrorMessage);
            expect(action).toEqual({
                type: types.LOGIN_FAILURE,
                errorMessage: 'Login failure: ' + serverErrorMessage
            }); 
        });

        it('creates the LOGIN_SUCCESS action', () => {
            const serverData = {
                authCode: 'whatever_auth_code'
            };
            const action = creators.loginSuccess(serverData);
            expect(action).toEqual({
                type: types.LOGIN_SUCCESS,
                authCode: 'whatever_auth_code'
            }); 
        });
        
        it('creates the LOGIN async action', () => {
            const spy = expect.createSpy(createAsyncAction);
            const action = creators.login('admin', 'admin');
            console.log("======================");
            console.log(spy.calls.length);
            expect(spy).toHaveBeenCalledWith(
                'login', 
                {
                    username: 'admin',
                    password: 'admin'
                },
                creators.loginRequest,
                creators.loginFailure,
                creators.loginSuccess
            );
        });
        
    });
});
