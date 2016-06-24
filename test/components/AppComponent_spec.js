/*
    external imports
*/

import expect from 'expect';
import React from 'react';
import jsdom from 'jsdom';
import { shallow, mount } from 'enzyme';

/*
    internal imports
*/

import AppComponent from '../../src/components/AppComponent';

/*
    setup
*/

const defaultProps = {
    handleLogin: function(){}
};

function setupDom() {
    if (typeof document !== 'undefined') {
        return;
    }

    global.document = jsdom.jsdom('<html><body></body></html>');
    global.window = document.defaultView;
    global.navigator = window.navigator;
};

function setupShallow(props) {
    const actualProps = {...defaultProps, ...props};
    const output = shallow(<AppComponent {...actualProps} />);
    return output;
};

function setupMount(props, stubbedComponents){           
    const actualProps = {...defaultProps, ...props};
    const output = mount(<AppComponent {...actualProps} />);
    return output;
}

setupDom();

/*
    tests
*/

describe('[components/AppComponent]', () => {

    describe('propTypes', () => {
        it('should define the correct propTypes', () => {
            expect(Object.keys(AppComponent.propTypes)).toEqual(Object.keys(defaultProps));
        });
    });
    
    describe('rendering', () => {
        
        it('should render the input.username', () => {
            const output = setupShallow();
            expect(output.find('.username').length).toBe(1);
            expect(output.find('.username').is('input')).toBe(true);
        });
        
        it('should render the input.password', () => {
            const output = setupShallow();
            expect(output.find('.password').length).toBe(1);
            expect(output.find('.password').is('input')).toBe(true);
        });
        
        it('should render the button.login_button', () => {
            const output = setupShallow();
            expect(output.find('.login_button').length).toBe(1);
            expect(output.find('.login_button').is('button')).toBe(true);
        });
    
    });
    
    describe('behaviour', () => {
        
        it('should call handleLogin when the button.login_button is clicked', () => {
            const handleLogin = expect.createSpy();
            const output = setupMount({
                handleLogin
            });
            output.find('.login_button').simulate('click');
            expect(handleLogin.calls.length).toBe(1);   
        });
        
    });
    
});