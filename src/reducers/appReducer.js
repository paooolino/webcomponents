import {
    SET_WINDOW_HEIGHT
} from '../actions/appActions';

const initialState = {
    windowHeight: 0
};

export default function items(state=initialState, action) {
    switch (action.type) {
        case SET_WINDOW_HEIGHT:
            return {
                ...state,
                windowHeight: action.payload.h
            };    
        
        default:
            return state;
    }    
}

