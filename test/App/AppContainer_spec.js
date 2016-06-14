import expect from 'expect';
import {mapDispatchToProps} from '../../src/App/AppContainer';
import {changeLanguage, logout, getLanguages } from '../../src/App/AppActions';

describe('[App/AppContainer_spec]', () => {
        
    describe('handleChangeLanguage', () => {
        
        it('should return an handleChangeLanguage function that dispatches the changeLanguage action', () => {
            const dispatchSpy = expect.createSpy();
            const handlers = mapDispatchToProps(dispatchSpy);
            expect(handlers.handleChangeLanguage).toBeA('function');
            
            handlers.handleChangeLanguage('it');
            expect(dispatchSpy.calls[0].arguments[0]).toEqual(changeLanguage('it'));
        });
        
    });
    
    describe('handleLogout', () => {
        
        it('should return an handleLogout function that dispatches the logout action', () => {
            const dispatchSpy = expect.createSpy();
            const handlers = mapDispatchToProps(dispatchSpy);
            expect(handlers.handleLogout).toBeA('function');
            
            handlers.handleLogout();
            expect(dispatchSpy.calls[0].arguments[0]).toEqual(logout());
        });
        
    });
    
    describe('handleGetLanguages', () => {
        
        it('should return an handleGetLanguages function that dispatches the getLanguages action', () => {
            const dispatchSpy = expect.createSpy();
            const handlers = mapDispatchToProps(dispatchSpy);
            expect(handlers.handleGetLanguages).toBeA('function');
            
            handlers.handleGetLanguages();
            expect(dispatchSpy.calls[0].arguments[0]).toEqual(getLanguages());
        });
        
    });
    
});
