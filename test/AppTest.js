import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { App } from '../src/components/App';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';

const mockStore = configureMockStore([]);

describe('AppRendering', () => {
    it('renders the login screen when user is not authenticated', () => {

        const store = mockStore({
            auth: {
                isAuthenticated: false
            }
        });
        
        let renderer = TestUtils.createRenderer();
        renderer.render(
            <App store={store} />
        );
        let output = renderer.getRenderOutput();

        //let [children] = output.props.children;
        console.log(output.props.children.type);
        expect(output.type).toBe('div');
        
        
        //console.log(output);
        //expect(output).toBe('div');
    });
});
