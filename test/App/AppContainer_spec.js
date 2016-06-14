import expect from 'expect';
import {mapDispatchToProps, mapStateToProps} from '../../src/App/AppContainer';
import {changeLanguage, logout, getLanguages } from '../../src/App/AppActions';

const state = {
    languages: [],
    statusMessage: '',
    isAuthenticated: false,
    nFetching: 0
};

describe('[App/AppContainer_spec]', () => {
        
    describe('mapDispatchToProps', () => {
        
        it('should return an handleChangeLanguage function that dispatches the changeLanguage action', () => {
            const dispatchSpy = expect.createSpy();
            const handlers = mapDispatchToProps(dispatchSpy);
            expect(handlers.handleChangeLanguage).toBeA('function');
            
            handlers.handleChangeLanguage('it');
            expect(dispatchSpy.calls[0].arguments[0]).toEqual(changeLanguage('it'));
        });
        
        it('should return an handleLogout function that dispatches the logout action', () => {
            const dispatchSpy = expect.createSpy();
            const handlers = mapDispatchToProps(dispatchSpy);
            expect(handlers.handleLogout).toBeA('function');
            
            handlers.handleLogout();
            expect(dispatchSpy.calls[0].arguments[0]).toEqual(logout());
        });
        
        it('should return an handleGetLanguages function that dispatches the getLanguages action', () => {
            const dispatchSpy = expect.createSpy();
            const handlers = mapDispatchToProps(dispatchSpy);
            expect(handlers.handleGetLanguages).toBeA('function');
            
            handlers.handleGetLanguages();
            expect(dispatchSpy.calls[0].arguments[0]).toEqual(getLanguages());
        });
        
    });
    
    describe('mapStateToProps', () => {
        it('should map the correct props types', () => {
            const props = mapStateToProps(state);
            expect(props.languages).toBeA('array');
            expect(props.statusMessage).toBeA('string');
            expect(props.isAuthenticated).toBeA('boolean');
            expect(props.nFetching).toBeA('number');
        });
    });
    
});
