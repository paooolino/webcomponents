import { types } from './actions';

const initialState = {
    selectedLanguage: '',
    isAuthenticated: false
};

export default (state=initialState, action) => {
    switch (action.type) {
        
        case types.CHANGE_LANGUAGE:
            return {
                ...initialState,
                selectedLanguage: action.newLanguage
            }
            
        case types.LOGOUT:
            return {
                ...initialState,
                isAuthenticated: false
            }
            
        default:
            return state;
    }
};
