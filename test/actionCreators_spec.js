/*
    external imports
*/

import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import nock from 'nock';

/*
    internal imports
*/

const ENDPOINT_HOST = 'http://127.0.0.1';
const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';

import * as creators from '../src/actionCreators';
import * as types from '../src/actionTypes';

/*
    setup
*/

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

/*
    tests
*/

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
        
        it('creates the LOGIN action which passes the correct parameters to the server', () => {
            let passedBody;
            nock(ENDPOINT_HOST).post(ENDPOINT_PATH)
                .reply(200, function(uri, requestBody){
                    passedBody = requestBody;
                });
               
            const store = mockStore({});

            return store.dispatch(creators.login('admin', 'admin'))
                .then(() => {
                    expect(passedBody.action).toBe('login');
                    expect(passedBody.username).toBe('admin');
                    expect(passedBody.password).toBe('admin');
                });
        });
        
    });
});
