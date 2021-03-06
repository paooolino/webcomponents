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

import LoginFormComponent from '../../src/components/LoginFormComponent';

/*
    setup
*/

const defaultProps = {
    username: '',
    password: '',
    handleChangeUsername: function(){},
    handleChangePassword: function(){},
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
    const output = shallow(<LoginFormComponent {...actualProps} />);
    return output;
};

function setupMount(props, stubbedComponents){           
    const actualProps = {...defaultProps, ...props};
    const output = mount(<LoginFormComponent {...actualProps} />);
    return output;
}

setupDom();

/*
    tests
*/

describe('[components/LoginFormComponent]', () => {
    
    describe('propTypes', () => {
        
        it('should define the correct propTypes', () => {
            expect(Object.keys(LoginFormComponent.propTypes)).toEqual(Object.keys(defaultProps));
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
                handleLogin,
                username: 'whatever_username',
                password: 'whatever_password'
            });
            output.find('.login_button').simulate('click');
            expect(handleLogin.calls.length).toBe(1);   
            expect(handleLogin.calls[0].arguments).toEqual(['whatever_username', 'whatever_password']);   
        });

        it('should call handleChangeUsername when the input.username is changed', () => {
            const handleChangeUsername = expect.createSpy();
            const output = setupMount({
                handleChangeUsername
            });
            output.find('.username').simulate(
                'change',
                { target: { value: "admin" }}
            );    
            expect(handleChangeUsername.calls.length).toBe(1);   
        });
        
        it('should call handleChangePassword when the input.password is changed', () => {
            const handleChangePassword = expect.createSpy();
            const output = setupMount({
                handleChangePassword
            });
            output.find('.password').simulate(
                'change',
                { target: { value: "admin" }}
            );    
            expect(handleChangePassword.calls.length).toBe(1);   
        });
      
    });
    
});
