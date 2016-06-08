import { combineReducers } from 'redux';
import auth from './authReducer';
import app from './appReducer';

// We combine the reducers here so that they
// can be left split apart above
const reducer = combineReducers({
    auth,
    app
});

export default reducer;