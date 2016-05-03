import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
} from '../actions/authActions';

const initialState = {
    isFetching: false,
    isAuthenticated: false,
    errorMessage: ''
};

export default function auth(state=initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isFetching: true,
                errorMessage: ''
            };
        
        case LOGIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            };
            
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.payload.errorMessage
            };
            
        default:
            return state;
    }    
}


