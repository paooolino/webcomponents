/*
    external imports
*/

/*
    internal imports
*/

import * as types from './actionTypes';

/*
    setup
*/

export const initialState = {
    nFetching: 0,
    isAuthenticated: false,
    errorMessages: [],
    username: '',
    password: ''
};

/*
    reducer definition
*/

export default (state=initialState, action) => {
    switch(action.type) {
        
        case types.LOGIN_REQUEST:
            return {
                ...state,
                nFetching: state.nFetching + 1
            };
            
        case types.LOGIN_FAILURE:
            return {
                ...state,
                nFetching: state.nFetching - 1,
                isAuthenticated: false,
                errorMessages: [
                    ...state.errorMessages, 
                    'Login failure: ' + action.errorMessage
                ]
            };
            
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                nFetching: state.nFetching - 1
            };
            
        case types.CHANGE_USERNAME:
            return {
                ...state,
                username: action.newValue
            };
            
        case types.CHANGE_PASSWORD:
            return {
                ...state,
                password: action.newValue
            };
            
        default:
            return state;
    }
}
