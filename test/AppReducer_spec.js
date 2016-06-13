import expect from 'expect';
import reducer from '../src/reducers/appReducer';
import {changeLanguage, logout} from '../src/actions/AppActions';
import {getLanguagesRequest, getLanguagesFailure, getLanguagesSuccess} from '../src/actions/AppActions';

describe('App reducer', () => {
    
    xit('should handle getLanguagesRequest', () => {});
    xit('should handle getLanguagesFailure', () => {});
    xit('should handle getLanguagesSuccess', () => {});
    xit('should handle logout', () => {});
    
    describe('changeLanguage', () => {
        
        xit('should change a language if present in the available languages', () => {});
        xit('should not change a language if not present in the available languages', () => {});
        
    });

});
