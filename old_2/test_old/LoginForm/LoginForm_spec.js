import expect from 'expect';
import React from 'react';
import jsdom from 'jsdom';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import LoginForm from '../../src/LoginForm/LoginForm';

const defaultProps = {
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
};

// here we stub the sub-components
// https://gist.github.com/TimothyRHuertas/d7d06313c5411fe242bb
function setupMount(props, stubbedComponents){
    const originalCreateElement = React.createElement;
    const DivFactory = React.createFactory('div');
     
    const sandbox = sinon.sandbox.create();

    // to do: verify that stubbing works when components have required props
    sandbox.stub(React, 'createElement', function(component, props){
        if( typeof component == 'function' ) {
            if(stubbedComponents.indexOf(component.name) !== -1){
                
                const componentFactory = React.createFactory(component);
                return componentFactory();
                
            }
        }
        return originalCreateElement.apply(React, arguments);   
    });
            
    const actualProps = {...defaultProps, ...props};
    const output = mount(<LoginForm {...actualProps} />);
    
    sandbox.restore();
    return output;
}

setupDom();

describe('[LoginForm/LoginForm_spec] LoginForm component', () => {
    
    describe('propTypes', () => {
        
        it('should define the correct propTypes', () => {
            expect(Object.keys(LoginForm.propTypes)).toEqual(Object.keys(defaultProps));
        });
        
    });    
    
    describe('rendering', () => {
        
        xit('should render the username field', () => {});
        xit('should render the password field', () => {});
        xit('should render the .login_button button', () => {});

    });
    
    describe('behaviour', () => {
         
    });
    
});