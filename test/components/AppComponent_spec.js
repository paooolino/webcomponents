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
    nFetching: 0,
    isAuthenticated: false,
    errorMessages: [],
    languages: [],
    handleGetLanguages: function(){}
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
        
        it('should render the .fetchinglayer when the app is fetching', () => {
            const output = setupShallow({ nFetching: 1 });
            expect(output.find('.fetchinglayer').length).toBe(1);
        });
        
        it('should not render the .fetchinglayer when the app is not fetching', () => {
            const output = setupShallow({ nFetching: 0 });
            expect(output.find('.fetchinglayer').length).toBe(0);
        });
        
        it('should render the LoginFormContainer when the use is not authenticated', () => {
            const output = setupShallow({ isAuthenticated: false });
            expect(output.find('.LoginFormContainer').length).toBe(1);
        });
        
        it('should not render the LoginFormContainer when the use is authenticated', () => {
            const output = setupShallow({ isAuthenticated: true });
            expect(output.find('.LoginFormContainer').length).toBe(0);
        });
        
        it('should render the .statusbar div with the last message', () => {
            const output = setupShallow({
                errorMessages: ['message 2', 'message 1']
            });
            expect(output.find('.statusbar').length).toBe(1);
            expect(output.find('.statusbar').children().length).toBe(1);
            expect(output.find('.statusbar').childAt([0]).text()).toEqual('message 2');
        });
        
        it('should render the .languagebar component', () => {
            const output = setupShallow({ languages: ['it', 'en'] });
            expect(output.find('.languagebar').length).toBe(1); 
            expect(output.find('.languagebar').children().length).toBe(2); 
            expect(output.find('.languagebar').childAt([0]).text()).toEqual('it');
            expect(output.find('.languagebar').childAt([1]).text()).toEqual('en');
        });
        
    });
    
    describe('behaviour', () => {
        
        xit('should call handleGetLanguages when the component is mounted', () => {
            const handleGetLanguages = expect.createSpy();
            const output = setupMount({
                handleGetLanguages
            });
            expect(handleGetLanguages.calls.length).toBe(1);   
        });
        
    });
    
});