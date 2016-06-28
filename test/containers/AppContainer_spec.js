/*
    external imports
*/

import expect from 'expect';

/*
    internal imports
*/

import AppContainer from '../../src/containers/AppContainer';
import { mapDispatchToProps, mapStateToProps } from '../../src/containers/AppContainer';

/*
    mocking
*/

const state = {
    nFetching: 0,
    isAuthenticated: false,
    errorMessages: []
};

/*
    tests
*/

describe('[containers/AppContainer]', () => {

    describe('mapDispatchToProps', () => {
        
    });
    
    describe('mapStateToProps', () => {

        it('should map the correct props types', () => {
            const props = mapStateToProps(state);
            expect(props.nFetching).toBeA('number');
            expect(props.isAuthenticated).toBeA('boolean');
            expect(props.errorMessages).toBeA('array');
        });
        
    });
    
});
