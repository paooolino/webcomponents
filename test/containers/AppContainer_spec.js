/*
    external imports
*/

import expect from 'expect';
import nock from 'nock';

/*
    internal imports
*/

import { mapDispatchToProps, mapStateToProps } from '../../src/containers/AppContainer';
import * as creators from '../../src/actionCreators';

/*
    tests
*/

describe('[containers/AppContainer]', () => {
    
    describe('mapDispatchToProps', () => {
        
        const dispatchSpy = expect.createSpy();
        const handlers = mapDispatchToProps(dispatchSpy);
            
        describe('handleLogin', () => {
            
            it('should be a function', () => {
                expect(handlers.handleLogin).toBeA('function');
            });
            
            it('should dispatch the login function', () => {
                handlers.handleLogin();
                expect(dispatchSpy.calls[0].arguments[0]).toEqual(creators.login('admin', 'admin'));
            });
            
        });
        
    });
    
    describe('mapStateToProps', () => {
        
        //
        
    });
    
});