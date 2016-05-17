//
// to be used by the reducer
//
export const SET_WINDOW_HEIGHT = 'SET_WINDOW_HEIGHT';

//
// action creators
//
const setWindowHeight = (h) => ({
    type: SET_WINDOW_HEIGHT,
    payload: {
        h
    }
});

//
// to be used by components
//
export { setWindowHeight };