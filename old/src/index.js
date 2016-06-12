import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducers/reducer';
import App from './components/App';

const store = createStore(reducer, applyMiddleware(thunk));
const rootElement = document.getElementById('root');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
