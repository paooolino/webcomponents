import expect from 'expect';
import React from 'react';
import jsdom from 'jsdom';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { App } from '../../src/App/App';

const defaultProps = {
    languages: [],
    statusMessage: '',
    isAuthenticated: false,
    nFetching: 0,
    handleGetLanguages: function(){},
    handleLogout: function(){},
    handleChangeLanguage: function(){}
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
    const output = shallow(<App {...actualProps} />);
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
    const output = mount(<App {...actualProps} />);
    
    sandbox.restore();
    return output;
}

setupDom();

describe('[App/App_spec] App component', () => {
    
    describe('rendering', () => {
        
        it('should render an .appBar div', () => {
            const output = setupShallow();
            expect(output.find('.appBar').length).toBe(1);
            expect(output.find('.appBar').is('div')).toBe(true);
        });
        
        it('should render the .languageSelector div in the .appBar', () => {
            const output = setupShallow();
            expect(output.find('.appBar .languageSelector').length).toBe(1);
            expect(output.find('.appBar .languageSelector').is('div')).toBe(true);
        });
        
        it('should render the languages as unordered list in .languageSelector', () => {
            const output = setupShallow({
                languages: ['it', 'en']
            });
            expect(output.find('.languageSelector ul').length).toBe(1);
            expect(output.find('.languageSelector ul li').length).toBe(2);
        });
        
        it('should render the .statusBar', () => {
            const output = setupShallow();
            expect(output.find('.statusBar').length).toBe(1);
            expect(output.find('.statusBar').is('div')).toBe(true);
        });
        
        it('should display the statusMessage in the .statusBar', () => {
            const output = setupShallow({
                statusMessage: 'Whatever status message.'
            });
            expect(output.find('.statusBar').text()).toEqual('Whatever status message.');
        });
        
        describe('When the user is not authenticated', () => {

            const output = setupShallow({
                isAuthenticated: false
            });
            
            it('should render the <LoginForm> component', () => {
                expect(output.find('LoginForm').length).toBe(1);
            });
            
            it('should NOT render the .logout_button in the .appBar', () => {
                expect(output.find('.appBar .logout_button').length).toBe(0);
            });
            
        });
        
        describe('When the user is authenticated', () => {

            const output = setupShallow({
                isAuthenticated: true
            });
            
            it('should render the <ItemManager> component', () => {
                expect(output.find('ItemManager').length).toBe(1);
            });
            
            it('should render the .logout_button in the .appBar', () => {
                expect(output.find('.appBar .logout_button').length).toBe(1);
                expect(output.find('.appBar .logout_button').is('button')).toBe(true);
            });
                
        });
        
        describe('When the app is fetching', () => {

            const output = setupShallow({
                nFetching: 1
            });
                
            it('should render the .fetching_overlay div', () => {
                expect(output.find('.fetching_overlay').length).toBe(1);
                expect(output.find('.fetching_overlay').is('div')).toBe(true);                
            });
            
        });
        
        describe('When the app is not fetching', () => {
            
            const output = setupShallow({
                nFetching: 0
            });
            
            it('should NOT render the .fetching_overlay div', () => {
                expect(output.find('.fetching_overlay').length).toBe(0);  
            });
            
        });
        
    });
    
    describe('behaviour', () => {
        
        it('should call handleGetLanguages when the component is mounted', () => {
            const handleGetLanguages = expect.createSpy();
            const output = setupMount({
                handleGetLanguages
            }, ['LoginForm']);
            expect(handleGetLanguages.calls.length).toBe(1);   
        });
        
        it('should call handleLogout when the .logout_button is clicked', () => {
            const handleLogout = expect.createSpy();
            const output = setupShallow({
                isAuthenticated: true,
                handleLogout
            });
            output.find('.logout_button').simulate('click');
            expect(handleLogout.calls.length).toBe(1);
        });
        
        it('should call handleChangeLanguage when a new language is clicked', () => {
            const handleChangeLanguage = expect.createSpy();
            const output = setupShallow({
                languages: ['it', 'en'],
                handleChangeLanguage 
            });
            output.find('.languageSelector ul').childAt(0).simulate('click');
            expect(handleChangeLanguage.calls.length).toBe(1);
        });
            
    });
    
});