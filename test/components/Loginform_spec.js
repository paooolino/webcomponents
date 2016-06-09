import expect from 'expect';
import React from 'react';
import jsdom from 'jsdom';
import { shallow, mount } from 'enzyme';
import { LoginForm } from '../../src/components/LoginForm';

const defaultProps = {
    handleLogin: expect.createSpy()
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
    const output = shallow(<LoginForm {...actualProps} />);
    return output;
}

function setupMount(props, opts){
    const actualProps = {...defaultProps, ...props};
    const output = mount(<LoginForm {...actualProps} />, opts);
    return output;
}

describe('LoginForm component', () => {
    
    setupDom();
    
    describe('rendering', () => {
        
        it('should render the #username field', () => {
            const output = setupShallow();
            expect(output.find('#username').length).toBe(1);          
        });
        
        it('should render the #password field', () => {
            const output = setupShallow();
            expect(output.find('#password').length).toBe(1);                
        });
        
        it('should render the #login_button button', () => {
            const output = setupShallow();
            expect(output.find('#login_button').is('button')).toBe(true); 
            expect(output.find('#login_button').length).toBe(1);               
        });  
        
    });    
    
    /*
    describe('behaviour', () => {

        it('should call handleLogin when the #login_button is clicked', () => {
            const handleLogin = expect.createSpy();
            const output = setupShallow({
                handleLogin
            });
            output.find('#login_button').childAt(0).simulate('click');
            expect(handleLogin.calls.length).toBe(1);            
        });
        
    });
    */
    
});
