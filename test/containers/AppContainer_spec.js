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
    mocking
*/

const state = {
    username: '',
    password: ''
};

/*
    tests
*/

describe('[containers/AppContainer]', () => {

    describe('mapDispatchToProps', () => {
    
        describe('handleLogin', () => {
            
            it('should dispatch the login function', () => {
                const dispatchSpy = expect.createSpy();
                const handlers = mapDispatchToProps(dispatchSpy);
                handlers.handleLogin('admin', 'admin');
                expect(dispatchSpy.calls[0].arguments[0]).toEqual(creators.login('admin', 'admin'));
            });
            
        });
        
        describe('handleChangeUsername', () => {

            it('should dispatch the changeUsername function', () => {
                const dispatchSpy = expect.createSpy();
                const handlers = mapDispatchToProps(dispatchSpy);
                const ev = {
                    target: { value: 'whatever_username' }
                }
                handlers.handleChangeUsername(ev);
                expect(dispatchSpy.calls[0].arguments[0]).toEqual(creators.changeUsername(ev.target.value));
            });
            
        });
        
        describe('handleChangePassword', () => {

            it('should dispatch the changePassword function', () => {
                const dispatchSpy = expect.createSpy();
                const handlers = mapDispatchToProps(dispatchSpy);
                const ev = {
                    target: { value: 'whatever_password' }
                }
                handlers.handleChangePassword(ev);
                expect(dispatchSpy.calls[0].arguments[0]).toEqual(creators.changePassword(ev.target.value));
            });
            
        });
        
    });
    
    describe('mapStateToProps', () => {

        it('should map the correct props types', () => {
            const props = mapStateToProps(state);
            expect(props.username).toBeA('string');
            expect(props.password).toBeA('string');
        });
        
    });
    
});
