import expect from 'expect';
import React from 'react';
import jsdom from 'jsdom';
import { shallow, mount } from 'enzyme';

import { App } from '../src/components/App';

const defaultProps = {
    languages: [],
    statusMessage: '',
    isAuthenticated: false,
    isFetching: false,
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
    const output = shallow(<App {...actualProps} />);
    return output;
};

function setupMount(props, opts){
    const actualProps = {...defaultProps, ...props};
    const output = mount(<App {...actualProps} />, opts);
    return output;
}

setupDom();

describe('App component', () => {
    
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
                isFetching: true
            });
                
            it('should render the .fetching_overlay div', () => {
                expect(output.find('.fetching_overlay').length).toBe(1);
                expect(output.find('.fetching_overlay').is('div')).toBe(true);                
            });
            
        });
        
        describe('When the app is not fetching', () => {
            
            const output = setupShallow({
                isFetching: false
            });
            
            it('should NOT render the .fetching_overlay div', () => {
                expect(output.find('.fetching_overlay').length).toBe(0);  
            });
            
        });
        
    });
    
    describe('behaviour', () => {
        
        it('should call handleGetLanguages when the component is mounted', () => {
            // use enzyme mount and mock components here
            // https://gist.github.com/TimothyRHuertas/d7d06313c5411fe242bb
            const handleGetLanguages = expect.createSpy();
            const output = setupMount({
                handleGetLanguages
            });
            expect(handleGetLanguages.calls.length).toBe(1);   
        });
        
        it('should call handleLogout when the logout button is clicked', () => {});
        
        it('should call handleChangeLanguage when a new language is clicked', () => {});
            
    });
    
});