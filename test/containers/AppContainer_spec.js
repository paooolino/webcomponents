/*
    external imports
*/

import expect from 'expect';

/*
    internal imports
*/

import AppContainer from '../../src/containers/AppContainer';
import {mapDispatchToProps, mapStateToProps} from '../../src/containers/AppContainer';
import * as creators from '../../src/actionCreators';

/*
    tests
*/

describe('[containers/AppContainer]', () => {
    
    describe('mapDispatchToProps', () => {

        it('should map the correct handlers types', () => {
            const props = mapDispatchToProps();
            expect(props.handleLogin).toBeA('function');
        });

        it('should dispatch the login action', () => {
            const dispatchSpy = expect.createSpy();
            const handlers = mapDispatchToProps(dispatchSpy);
            
            handlers.handleLogin();           
            expect(dispatchSpy.calls[0].arguments[0]).toEqual(creators.login('admindd', 'admadsfin'));
        });


    });
    
    describe('mapStateToProps', () => {
        
    });
    
});
