import {reducer as formReducer} from 'redux-form';
import { combineReducers } from 'redux';
import auth from './authReducer';
import items from './itemsReducer';

// We combine the reducers here so that they
// can be left split apart above
const reducer = combineReducers({
    auth,
    items,
    form: formReducer
});

export default reducer;
