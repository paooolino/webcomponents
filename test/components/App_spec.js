import expect from 'expect';
import React from 'react';
import jsdom from 'jsdom';
import { shallow, mount } from 'enzyme';
import { App } from '../../src/components/App';
import { LoginForm } from '../../src/components/LoginForm';
import { ItemManager } from '../../src/components/ItemManager';

const defaultProps = {
    isAuthenticated: false,
    nFetching: 0,
    handleLogout: expect.createSpy(),
    handleGetLangInfos: expect.createSpy(),
    handleChangeLanguage: expect.createSpy(),
    languages: [],
    statusMessage: ''
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
}

function setupMount(props, opts){
    const actualProps = {...defaultProps, ...props};
    const output = mount(<App {...actualProps} />, opts);
    return output;
}

describe('App component', () => {
    
    setupDom();
    
    describe('rendering', () => {
        
        it('should render a wrapper div having #appContainer as id', () => {
            const output = setupShallow({isAuthenticated: false});
            expect(output.find('#appContainer').length).toBe(1);
            expect(output.find('#appContainer').is('div')).toBe(true);
        });

        it('should render the #appBar', () => {
            const output = setupShallow({isAuthenticated: false});
            expect(output.find('#appBar').length).toBe(1);
        });
        
        it('should render the #languageSelector in the #appBar', () => {
            const output = setupShallow({isAuthenticated: false});
            expect(output.find('#appBar #languageSelector').length).toBe(1);
        });
        
        it('should render the available languages as unordered list in #languageSelector', () => {
            const output = setupShallow({
                isAuthenticated: false,
                languages: ['it', 'en']
            });
            expect(output.find('#languageSelector ul').length).toBe(1);
            expect(output.find('#languageSelector ul li').length).toBe(2);
        });
        
        it('should render the #statusBar', () => {
            const output = setupShallow({isAuthenticated: false});
            expect(output.find('#statusBar').length).toBe(1);
        });
        
        it('should display the statusMessage in the #statusBar', () => {
            const output = setupShallow({statusMessage: 'A custom status message.'});
            expect(output.find('#statusBar').text()).toEqual('A custom status message.');
        });
        
        describe('When the user is not authenticated', () => {
            
            const output = setupShallow({isAuthenticated: false});

            it('should render the LoginForm component as first child', () => {
                const firstChild = output.childAt(0);
                expect(firstChild.is(LoginForm)).toBe(true); 
            });
            
            it('should not render the #logout_button in the #appBar', () => {
                expect(output.find('#logout_button').length).toBe(0);                
            });
            
        });
        
        describe('When the user is authenticated', () => {
            
            const output = setupShallow({isAuthenticated: true});
            
            it('should render the ItemManager component as first child', () => {
                const firstChild = output.childAt(0);
                expect(firstChild.is(ItemManager)).toBe(true); 
            });
            
            it('should render the #logout_button in the #appBar', () => {
                expect(output.find('#appBar #logout_button').length).toBe(1);    
                expect(output.find('#logout_button').is('button')).toBe(true);    
            });

        });
        
        describe('When the app is fetching', () => {
            
            const output = setupShallow({nFetching: 1});
            
            it('should render the #fetching_overlay', () => {
                expect(output.find('#fetching_overlay').length).toBe(1);  
            });
            
        });
        
        describe('When the app is not fetching', () => {
            
            const output = setupShallow({nFetching: 0});
            
            it('should not render the #fetching_overlay', () => {
                expect(output.find('#fetching_overlay').length).toBe(0);  
            });
            
        });
        
    });    

    describe('behaviour', () => {
        
        it('should call handleGetLangInfos when the component is mounted', () => {
            const handleGetLangInfos = expect.createSpy();
            const output = setupMount({
                handleGetLangInfos
            });
            expect(handleGetLangInfos.calls.length).toBe(1);            
        });
        
        it('should call handleLogout when the logout button is clicked', () => {
            const handleLogout = expect.createSpy();
            const output = setupShallow({
                isAuthenticated: true,
                handleLogout
            });
            output.find('#logout_button').simulate('click');
            expect(handleLogout.calls.length).toBe(1);
        });
        
        it('should call handleChangeLanguage when a new language is clicked', () => {
            const handleChangeLanguage = expect.createSpy();
            const output = setupShallow({
                handleChangeLanguage,
                languages: ['it', 'en']
            });
            output.find('#languageSelector ul').childAt(0).simulate('click');
            expect(handleChangeLanguage.calls.length).toBe(1);            
        });

    });
    
});
