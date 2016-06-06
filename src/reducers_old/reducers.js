import {reducer as formReducer} from 'redux-form';
import { combineReducers } from 'redux';
import auth from './authReducer';
import items from './itemsReducer';
import app from './appReducer';

// We combine the reducers here so that they
// can be left split apart above
const reducer = combineReducers({
    auth,
    items,
    app,
    form: formReducer
});

export default reducer;
