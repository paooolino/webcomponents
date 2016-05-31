import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import expect from 'expect';
//import configureMockStore from 'redux-mock-store';

//const mockStore = configureMockStore([]);

/*
const store = mockStore({
    auth: {
        isAuthenticated: false
    }
});
*/
    
import { App } from '../src/components/App';
    
describe('AppRendering', () => {
    it('should render a wrapper div', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<App isAuthenticated={false} />);
        const output = renderer.getRenderOutput();
        
        expect(output.type).toBe('div');
    });
    it('should render the AppSkeleton wrapped component if user authenticated', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<App isAuthenticated={true} />);
        const output = renderer.getRenderOutput();
        
        expect(output.props.children.type.WrappedComponent.name).toBe('AppSkeleton');
    });
    it('should render the LoginFormContainer component if user is not authenticated', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<App isAuthenticated={false} />);
        const output = renderer.getRenderOutput();
      
        expect(output.props.children.type.WrappedComponent.name).toBe('ConnectedForm');
    });
});

