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
    errorMessages: []
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
            
        default:
            return state;
    }
}
