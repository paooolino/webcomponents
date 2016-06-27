/*
    external imports
*/

import expect from 'expect';

/*
    internal imports
*/

import AppContainer from '../../src/containers/AppContainer';
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
            
            it('should dispatch the login function', () => {
                handlers.handleLogin();
                expect(dispatchSpy.calls[0].arguments[0]).toEqual(creators.login('admin', 'admin'));
            });
            
        });
        
        describe('handleChangeUsername', () => {

            it('should dispatch the changeUsername function', () => {
                handlers.changeUsername();
                expect(dispatchSpy.calls[0].arguments[0]).toEqual(creators.changeUsername('admin'));
            });
            
        });
        
        describe('handleChangePassword', () => {

            it('should dispatch the changePassword function', () => {
                handlers.changePassword();
                expect(dispatchSpy.calls[0].arguments[0]).toEqual(creators.changePassword('admin'));
            });
            
        });
        
    });
    
    describe('mapStateToProps', () => {

        it('should map the correct props types', () => {
            const props = mapStateToProps();
            expect(props.username).toBeA('string');
            expect(props.password).toBeA('string');
        });
        
    });
    
});
