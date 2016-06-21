/*
    external imports
*/

import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

/*
    internal imports
*/

import reducer from './reducer';
import AppContainer from './containers/AppContainer';

/*
    setup
*/

const store = createStore(reducer, applyMiddleware(thunk));
const rootElement = document.getElementById('root');

/*
    render
*/

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    rootElement
);
