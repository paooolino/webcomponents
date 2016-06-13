import expect from 'expect';
import {changeLanguage, logout, getLanguages} from '../../src/App/AppActions';
import {handleChangeLanguage, handleLogout, handleGetLanguages} from '../../src/App/AppContainer';

describe('App container', () => {
        
    describe('handleChangeLanguage', () => {
        
        xit('should dispatch the changeLanguage action with the passed language', () => {
            const dispatchedAction = handleChangeLanguage('it');
            expect(dispatchedAction).toEqual(changeLanguage('it'));
        });
        
    });
    
    describe('handleLogout', () => {
        
        xit('should dispatch the handleLogout action', () => {
            const dispatchedAction = handleLogout();
            expect(dispatchedAction).toEqual(handleLogout());
        });
        
    });
    
    describe('handleGetLanguages', () => {
        
        xit('should dispatch the handleGetLanguages async action', () => {
            const dispatchedAction = handleGetLanguages();
            expect(handleGetLanguages).toEqual(handleGetLanguages());
        });
        
    });
    
});