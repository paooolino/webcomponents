import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT
} from '../actions/authActions';

const initialState = {
    isFetching: false,
    isAuthenticated: false,
    errorMessage: '',
    loginPayload: {}
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
                errorMessage: '',
                loginPayload: action.payload
            };
            
        case LOGIN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.payload.errorMessage
            };
            
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                isFetching: false,
                errorMessage: ''
            };
            
        default:
            return state;
    }    
}


