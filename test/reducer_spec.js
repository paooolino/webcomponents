import expect from 'expect';

import * as types from '../src/actionTypes';
import reducer, { initialState } from '../src/reducer';

describe('[reducer_spec]', () => {
    
    it('should return the initial state', () => {
        const nextState = reducer(undefined, {});
        expect(nextState).toEqual(initialState);
    });
    
    describe('login actions', () => {
        
        it('should handle LOGIN_REQUEST', () => {
            const nextState = reducer({
                ...initialState,
                nFetching: 0
            }, {
                type: types.LOGIN_REQUEST
            });
            expect(nextState).toEqual({
                ...initialState,
                nFetching: 1
            });
        });
        
        it('should handle LOGIN_FAILURE', () => {
            const errorMessage = 'Whatever error message';
            const nextState = reducer({
                ...initialState,
                nFetching: 1,
                errorMessages: []
            }, {
                type: types.LOGIN_FAILURE,
                errorMessage
            });
            expect(nextState).toEqual({
                ...initialState,
                nFetching: 0,
                isAuthenticated: false,
                errorMessages: [errorMessage] 
            });
        });
        
        it('should handle LOGIN_SUCCESS', () => {
            const nextState = reducer({
                ...initialState,
                isAuthenticated: false,
                nFetching: 1
            }, {
                type: types.LOGIN_SUCCESS,
            });
            expect(nextState).toEqual({
                ...initialState,
                nFetching: 0,
                isAuthenticated: true
            });
        });
        
        it('should handle CHANGE_USERNAME', () => {
            const nextState = reducer({
                ...initialState,
                username: ''
            }, {
                type: types.CHANGE_USERNAME,
                newValue: 'whatever_username'
            });
            expect(nextState).toEqual({
                ...initialState,
                username: 'whatever_username'
            });
        });
        
        it('should handle CHANGE_PASSWORD', () => {
            const nextState = reducer({
                ...initialState,
                password: ''
            }, {
                type: types.CHANGE_PASSWORD,
                newValue: 'whatever_password'
            });
            expect(nextState).toEqual({
                ...initialState,
                password: 'whatever_password'
            });
        });
        
        it('should handle GET_LANGUAGES_REQUEST', () => {
            const nextState = reducer({
                ...initialState,
                nFetching: 0
            }, {
                type: types.GET_LANGUAGES_REQUEST
            });
            expect(nextState).toEqual({
                ...initialState,
                nFetching: 1
            });
        });
        
        it('should handle GET_LANGUAGES_FAILURE', () => {
            const errorMessage = 'Whatever error message';
            const nextState = reducer({
                ...initialState,
                nFetching: 1,
                errorMessages: []
            }, {
                type: types.GET_LANGUAGES_FAILURE,
                errorMessage
            });
            expect(nextState).toEqual({
                ...initialState,
                nFetching: 0,
                errorMessages: [errorMessage] 
            });
        });
        
        it('should handle GET_LANGUAGES_SUCCESS', () => {
            const nextState = reducer({
                ...initialState,
                languages: [],
                nFetching: 1
            }, {
                type: types.GET_LANGUAGES_SUCCESS,
                languages: ['it', 'en']
            });
            expect(nextState).toEqual({
                ...initialState,
                nFetching: 0,
                languages: ['it', 'en']
            });
        });
    });
    
});
