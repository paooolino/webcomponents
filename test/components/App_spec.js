import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { App } from '../../src/components/App';
import { LoginForm } from '../../src/components/LoginForm';
import { ItemManager } from '../../src/components/ItemManager';

function setup(props) {
    let renderer = TestUtils.createRenderer();
    renderer.render(<App {...props} />);
    let output = renderer.getRenderOutput();
    
    return output;
}

describe('App component', () => {
       
    describe('rendering', () => {
        
        it('should render a wrapper div', () => {
            
            const output = setup({isAuthenticated: false});
            expect(output.type).toBe('div');
            
        });
        
        describe('When the user is not authenticated', () => {
            
            const output = setup({isAuthenticated: false});

            it('should render the LoginForm component as first child', () => {
                
                const firstChild = output.props.children.length > 0 ? output.props.children[0] : output.props.children;
                expect(TestUtils.isElementOfType(firstChild, LoginForm)).toBe(true); 
            
            });
            
            it('should not render the logout button in the #appBar');
            
        });
        
        describe('When the user is authenticated', () => {
            
            const output = setup({isAuthenticated: true});
            
            it('should render the ItemManager component as first child', () => {
                
                const firstChild = output.props.children.length > 0 ? output.props.children[0] : output.props.children;
                expect(TestUtils.isElementOfType(firstChild, ItemManager)).toBe(true); 
                
            });
            
            it('should render the logout button in the #appBar');

        });
        
        describe('When the app is fetching', () => {
            
            it('should render the #fetching overlay');
            
        });
        
        it('should render the #appBar');
        it('should render the #languageSelector in the #appBar');
        it('should render the #statusBar');
        
    });    

    describe('behaviour', () => {
        it('should dispatch the logout action when the logout button is clicked');
        it('should dispatch the getLangInfos actions when the component is mounted');
        it('should dispatch the changeLanguage action when a new language is picked');
        it('should dispatch the updateWindowHeight action when the component is mounted');
        it('should dispatch the updateWindowHeight when the browser window is resized');
    });
    
});
