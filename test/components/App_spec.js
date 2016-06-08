import expect from 'expect';
import React from 'react';
//import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import { App } from '../../src/components/App';
import { LoginForm } from '../../src/components/LoginForm';
import { ItemManager } from '../../src/components/ItemManager';

function setup(props) {
    //let renderer = TestUtils.createRenderer();
    //renderer.render(<App {...props} />);
    //let output = renderer.getRenderOutput();
    
    const output = shallow(<App {...props} />);
    return output;
}

describe('App component', () => {
       
    describe('rendering', () => {
        
        it('should render a wrapper div', () => {
            const output = setup({isAuthenticated: false});
            expect(output.is('div')).toBe(true);
        });

        it('should render the #appBar', () => {
            const output = setup({isAuthenticated: false});
            expect(output.find('#appBar').length).toBe(1);
        });
        
        it('should render the #languageSelector in the #appBar', () => {
            const output = setup({isAuthenticated: false});
            expect(output.find('#appBar #languageSelector').length).toBe(1);
        });
        
        it('should render the #statusBar', () => {
            const output = setup({isAuthenticated: false});
            expect(output.find('#statusBar').length).toBe(1);
        });
        
        describe('When the user is not authenticated', () => {
            
            const output = setup({isAuthenticated: false});

            it('should render the LoginForm component as first child', () => {
                const firstChild = output.childAt(0);
                expect(firstChild.is(LoginForm)).toBe(true); 
            });
            
            it('should not render the #logout_button in the #appBar', () => {
                expect(output.find('#logout_button').length).toBe(0);                
            });
            
        });
        
        describe('When the user is authenticated', () => {
            
            const output = setup({isAuthenticated: true});
            
            it('should render the ItemManager component as first child', () => {
                const firstChild = output.childAt(0);
                expect(firstChild.is(ItemManager)).toBe(true); 
            });
            
            it('should render the #logout_button in the #appBar', () => {
                expect(output.find('#logout_button').length).toBe(1);    
                expect(output.find('#logout_button').is('button')).toBe(true);    
            });

        });
        
        describe('When the app is fetching', () => {
            
            const output = setup({isFetching: true});
            
            it('should render the #fetching_overlay', () => {
                expect(output.find('#fetching_overlay').length).toBe(1);  
            });
            
        });
        
        describe('When the app is not fetching', () => {
            
            const output = setup({isFetching: false});
            
            it('should not render the #fetching_overlay', () => {
                expect(output.find('#fetching_overlay').length).toBe(0);  
            });
            
        });
        
    });    

    describe('behaviour', () => {
        it('should dispatch the logout action when the logout button is clicked');
        it('should dispatch the getLangInfos actions when the component is mounted');
        it('should dispatch the changeLanguage action when a new language is picked');
        it('should dispatch the updateWindowHeight action when the component is mounted');
        it('should dispatch the updateWindowHeight when the browser window is resized');
    });
    
});
