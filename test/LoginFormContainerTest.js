import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

const mockStore = configureMockStore([]);

const store = mockStore({
    auth: {
        isFetching: false,
        errorMessage: ''
    },
    form: {
    }
});

import LoginFormContainer from '../src/components/LoginFormContainer';

var component = TestUtils.renderIntoDocument(
    <Provider store={store}><LoginFormContainer /></Provider>
);
        
//console.log(component);

describe('LoginFormContainer', () => {

});
