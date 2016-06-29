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

import * as creators from '../src/actionCreators';
import * as types from '../src/actionTypes';

/*
    setup
*/

const ENDPOINT_HOST = 'http://127.0.0.1';
const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';
const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

/*
    tests
*/

describe('[actionCreators_spec]', () => {

    describe('LOGIN', () => {

        it('creates the LOGIN_REQUEST action', () => {
            const action = creators.loginRequest();
            expect(action).toEqual({
                type: types.LOGIN_REQUEST
            });
        });

        it('creates the LOGIN_FAILURE action', () => {
            const serverErrorMessage = "Whatever error message";
            const action = creators.loginFailure(serverErrorMessage);
            expect(action).toEqual({
                type: types.LOGIN_FAILURE,
                errorMessage: "Whatever error message"
            });
        });

        it('creates the LOGIN_SUCCESS action', () => {
            const serverData = {"authCode":"whatever_auth_code"};
            const action = creators.loginSuccess(serverData);
            expect(action).toEqual({
                type: types.LOGIN_SUCCESS,
                authCode: "whatever_auth_code"
            });
        });

        it('creates the async LOGIN action which passes the correct parameters to the server', () => {
            let passedData;
            nock(ENDPOINT_HOST).post(ENDPOINT_PATH)
                .reply(200, function(uri, requestBody){
                    passedData = requestBody;
                });

            const store = mockStore({});

            const username = "admin";
            const password = "admin123";
            return store.dispatch(creators.login(username, password))
                .then(() => {
                    expect(passedData.action).toBe('login');
                    expect(passedData.username).toBe("admin");
                    expect(passedData.password).toBe("admin123");
                });
        });

    });

    it('creates the CHANGE_FIELD_USERNAME action', () => {
        const action = creators.changeFieldUsername();
        expect(action).toEqual({
            type: types.CHANGE_FIELD_USERNAME
        });
    });

    it('creates the CHANGE_FIELD_PASSWORD action', () => {
        const action = creators.changeFieldPassword();
        expect(action).toEqual({
            type: types.CHANGE_FIELD_PASSWORD
        });
    });

    describe('GET_LANGUAGES', () => {

        it('creates the GET_LANGUAGES_REQUEST action', () => {
            const action = creators.getLanguagesRequest();
            expect(action).toEqual({
                type: types.GET_LANGUAGES_REQUEST
            });
        });

        it('creates the GET_LANGUAGES_FAILURE action', () => {
            const serverErrorMessage = "Whatever error message";
            const action = creators.getLanguagesFailure(serverErrorMessage);
            expect(action).toEqual({
                type: types.GET_LANGUAGES_FAILURE,
                errorMessage: "Whatever error message"
            });
        });

        it('creates the GET_LANGUAGES_SUCCESS action', () => {
            const serverData = {"languages":["it","en"]};
            const action = creators.getLanguagesSuccess(serverData);
            expect(action).toEqual({
                type: types.GET_LANGUAGES_SUCCESS,
                languages: ["it","en"]
            });
        });

        it('creates the async GET_LANGUAGES action which passes the correct parameters to the server', () => {
            let passedData;
            nock(ENDPOINT_HOST).post(ENDPOINT_PATH)
                .reply(200, function(uri, requestBody){
                    passedData = requestBody;
                });

            const store = mockStore({});

            return store.dispatch(creators.getLanguages())
                .then(() => {
                    expect(passedData.action).toBe('getLanguages');
                });
        });

    });

    it('creates the SELECT_LANGUAGE action', () => {
        const action = creators.selectLanguage();
        expect(action).toEqual({
            type: types.SELECT_LANGUAGE
        });
    });

});

