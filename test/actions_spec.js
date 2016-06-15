import expect from 'expect';
import { actionTypes as types } from '../src/actions';
import { actionCreators as creators } from '../src/actions';

describe('[actions_spec]', () => {
    
    xit('should export the correct Types', () => {
        const expectedTypes = [
            'CHANGE_LANGUAGE',
            'LOGOUT',      
            'SELECT_ITEM',
            
            'LOGIN_REQUEST',
            'LOGIN_FAILURE',
            'LOGIN_SUCCESS',
            
            'REQUEST_LANGUAGES_REQUEST',
            'REQUEST_LANGUAGES_FAILURE',
            'REQUEST_LANGUAGES_SUCCESS',
            
            'FETCH_ITEMS_REQUEST',
            'FETCH_ITEMS_FAILURE',
            'FETCH_ITEMS_SUCCESS',
            
            'ADD_ITEM_REQUEST',
            'ADD_ITEM_FAILURE',
            'ADD_ITEM_SUCCESS',
            
            'DELETE_ITEM_REQUEST',
            'DELETE_ITEM_FAILURE',
            'DELETE_ITEM_SUCCESS',
            
            'SAVE_ITEM_FIELD_REQUEST',
            'SAVE_ITEM_FIELD_FAILURE',
            'SAVE_ITEM_FIELD_SUCCESS'
        ];
        expect(Object.keys(types)).toEqual(Object.keys(expectedTypes));
    });
    
    xit('should export the correct Creators', () => {
        const expectedCreators = [
            'changeLanguage',
            'logout',
            'selectItem',
            
            'login',
            'loginRequest',
            'loginFailure',
            'loginSuccess',
            
            'requestLanguages',
            'requestLanguagesRequest',
            'requestLanguagesFailure',
            'requestLanguagesSuccess',
            
            'fetchItems',
            'fetchItemsRequest',
            'fetchItemsFailure',
            'fetchItemsSuccess',
            
            'addItem',
            'addItemRequest',
            'addItemFailure',
            'addItemSuccess',
            
            'deleteItem',
            'deleteItemRequest',
            'deleteItemFailure',
            'deleteItemSuccess',
            
            'saveItemField',
            'saveItemFieldRequest',
            'saveItemFieldFailure',
            'saveItemFieldSuccess'   
        ];
        expect(Object.keys(types)).toEqual(Object.keys(expectedCreators));
    });
    
    describe('Sync action creators', () => {
        
        xit('should create an action to change language', () => {
            expect(creators.changeLanguage('it')).toEqual({
                type: types.CHANGE_LANGUAGE,
                newLanguage: 'it'
            });
        });
        
        xit('should create an action to logout', () => {
            expect(creators.logout()).toEqual({
                type: types.LOGOUT
            });
        });
        
        xit('should create an action to request a login', () => {
            const user = 'whatever_username';
            const pass = 'whatever_password';
            expect(creators.loginRequest(user, pass)).toEqual({
                type: types.LOGIN_REQUEST,
                user,
                pass
            });
        });
        xit('should create an action to fail a login', () => {
            const errorMessage = 'whatever error message';
            expect(creators.loginFailure()).toEqual({
                type: types.LOGIN_FAILURE,
                errorMessage
            });
        });
        xit('should create an action to success a login', () => {
            expect(creators.loginSuccess()).toEqual({
                type: types.LOGIN_SUCCESS
            });
        });
        
        xit('should create an action to select an item', () => {
            const item_id = 3;
            expect(creators.selectItem(item_id)).toEqual({
                type: types.SELECT_ITEM,
                selectedItem: item_id
            });
        });
        
        xit('should create an action to request a language request', () => {});
        xit('should create an action to fail a language request', () => {});
        xit('should create an action to success a language request', () => {});
        
        xit('should create an action to request an items fetch', () => {});
        xit('should create an action to fail an items fetch', () => {});
        xit('should create an action to success an items fetch', () => {});

        xit('should create an action to request an item addition', () => {});
        xit('should create an action to fail an item addition', () => {});
        xit('should create an action to success an item addition', () => {});

        xit('should create an action to request an item deletion', () => {});
        xit('should create an action to fail an item deletion', () => {});
        xit('should create an action to success an item deletion', () => {});
        
        xit('should create an action to request an item field save', () => {});
        xit('should create an action to fail an item field save', () => {});
        xit('should create an action to success an item field save', () => {});   
        
    });
    
    describe('Async action creators', () => {
        
        // just check if they are functions
        xit('should create an async action to login', () => {});
        xit('should create an async action to request languages', () => {});
        xit('should create an async action to fetch items', () => {});
        xit('should create an async action to add an item', () => {});
        xit('should create an async action to delete an item', () => {});
        xit('should create an async action to save an item field', () => {});
        
    });

    describe('Async action behaviour', () => {
        
        xit('should dispatch request and success actions when login has been dispatched', () => {});
        xit('should dispatch request and success actions when requestLanguages has been dispatched', () => {});
        xit('should dispatch request and success actions when fetchItems has been dispatched', () => {});
        xit('should dispatch request and success actions when addItem has been dispatched', () => {});
        xit('should dispatch request and success actions when deleteItem has been dispatched', () => {});
        xit('should dispatch request and success actions when saveItemField has been dispatched', () => {});
        
    });
    
});
