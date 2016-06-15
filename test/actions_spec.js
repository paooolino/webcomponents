/* external imports */
import expect from 'expect';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/* internal imports */
import { actionTypes as types } from '../src/actions';
import { actionCreators as creators } from '../src/actions';

const mockStore = configureMockStore([thunk]);
const ENDPOINT_HOST = 'http://127.0.0.1';
const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';

describe('[actions_spec]', () => {
    
    xit('should export the correct Types', () => {
        const expectedTypes = [
            'CHANGE_LANGUAGE',
            'LOGOUT',      
            'SELECT_ITEM',
            
            'LOGIN_REQUEST',
            'LOGIN_FAILURE',
            'LOGIN_SUCCESS',
            
            'GET_LANGUAGES_REQUEST',
            'GET_LANGUAGES_FAILURE',
            'GET_LANGUAGES_SUCCESS',
            
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
            
            'getLanguages',
            'getLanguagesRequest',
            'getLanguagesFailure',
            'getLanguagesSuccess',
            
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
        
        xit('should create an action to select an item', () => {
            const item_id = 3;
            expect(creators.selectItem(item_id)).toEqual({
                type: types.SELECT_ITEM,
                selectedItem: item_id
            });
        });
        
        describe('login', () => {
            
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
            
        });
        
        describe('getLanguages', () => {
            
            xit('should create an action to request a get languages', () => {
                expect(creators.getLanguagesRequest()).toEqual({
                    type: types.GET_LANGUAGES_REQUEST
                });
            });
            xit('should create an action to fail a get languages', () => {
                const errorMessage = 'whatever error message';
                expect(creators.getLanguagesFailure()).toEqual({
                    type: types.GET_LANGUAGES_FAILURE,
                    errorMessage
                });
            });
            xit('should create an action to success a get languages', () => {
                const languages = ['it', 'en'];
                expect(creators.getLanguagesSuccess(languages)).toEqual({
                    type: types.GET_LANGUAGES_SUCCESS,
                    languages
                });
            });
            
        });
        
        describe('fetchItems', () => {
            
            xit('should create an action to request an items fetch', () => {
                expect(creators.fetchItemsRequest()).toEqual({
                    type: types.FETCH_ITEMS_REQUEST
                });
            });
            xit('should create an action to fail an items fetch', () => {
                const errorMessage = 'whatever error message';
                expect(creators.fetchItemsFailure()).toEqual({
                    type: types.FETCH_ITEMS_FAILURE,
                    errorMessage
                });            
            });
            xit('should create an action to success an items fetch', () => {
                const items = [{id: 1}, {id: 2}];
                expect(creators.fetchItemsSuccess(items)).toEqual({
                    type: types.FETCH_ITEMS_SUCCESS,
                    items
                });
            });
            
        });
        
        describe('addItem', () => {
            
            xit('should create an action to request an item addition', () => {
                expect(creators.addItemRequest()).toEqual({
                    type: types.ADD_ITEM_REQUEST
                });
            });
            xit('should create an action to fail an item addition', () => {
                const errorMessage = 'whatever error message';
                expect(creators.addItemFailure()).toEqual({
                    type: types.ADD_ITEM_FAILURE,
                    errorMessage
                });   
            });
            xit('should create an action to success an item addition', () => {
                expect(creators.addItemSuccess()).toEqual({
                    type: types.ADD_ITEM_SUCCESS
                });
            });
            
        });
        
        describe('deleteItem', () => {
            xit('should create an action to request an item deletion', () => {
                const id = 1;
                expect(creators.deleteItemRequest(id)).toEqual({
                    type: types.DELETE_ITEM_REQUEST
                });
            });
            xit('should create an action to fail an item deletion', () => {
                const errorMessage = 'whatever error message';
                expect(creators.deleteItemFailure()).toEqual({
                    type: types.DELETE_ITEM_FAILURE,
                    errorMessage
                });  
            });
            xit('should create an action to success an item deletion', () => {
                expect(creators.deleteItemSuccess()).toEqual({
                    type: types.DELETE_ITEM_SUCCESS
                });
            });
        });
        
        describe('saveItemField', () => {
            xit('should create an action to request an item field save', () => {
                const id = 1;
                const fieldName = 'field_name';
                const fieldValue = 'field value';
                expect(creators.saveItemFieldRequest(id, fieldName, fieldValue)).toEqual({
                    type: types.SAVE_ITEM_FIELD_REQUEST
                });
            });
            xit('should create an action to fail an item field save', () => {
                const errorMessage = 'whatever error message';
                expect(creators.saveItemFieldFailure()).toEqual({
                    type: types.SAVE_ITEM_FIELD_FAILURE,
                    errorMessage
                });  
            });
            xit('should create an action to success an item field save', () => {
                expect(creators.saveItemFieldSuccess()).toEqual({
                    type: types.SAVE_ITEM_FIELD_SUCCESS
                });
            });   
        });
        
    });
    
    describe('Async action creators', () => {
        
        // just check if they are functions
        xit('should create an async action to login', () => {
             expect(login()).toBeA('function');
        });
        xit('should create an async action to get languages', () => {
             expect(getLanguages()).toBeA('function');
        });
        xit('should create an async action to fetch items', () => {
             expect(fetchItems()).toBeA('function');
        });
        xit('should create an async action to add an item', () => {
             expect(addItem()).toBeA('function');
        });
        xit('should create an async action to delete an item', () => {
             expect(deleteItem()).toBeA('function');
        });
        xit('should create an async action to save an item field', () => {
             expect(saveItemField()).toBeA('function');
        });
        
    });

    describe('Async action behaviour', () => {
        
        xit('should dispatch request and success actions when login has been dispatched', () => {
            const serverReply = {
                status: 'ok'
            };
            nock(ENDPOINT_HOST)
                .post(ENDPOINT_PATH)
                .reply(200, serverReply);
            
            const expectedActions = [
                { type: LOGIN_REQUEST },
                { type: LOGIN_SUCCESS }
            ];
            const store = mockStore({});
            return store.dispatch(login())
                .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })          
        });
        xit('should dispatch request and success actions when requestLanguages has been dispatched', () => {
            const serverReply = {
                status: 'ok',
                languages: ['it', 'en']
            };
            nock(ENDPOINT_HOST)
                .post(ENDPOINT_PATH)
                .reply(200, serverReply);

            let dataToPass = {...serverReply};
            delete dataToPass.status;
            
            const expectedActions = [
                { type: GET_LANGUAGES_REQUEST },
                { type: GET_LANGUAGES_SUCCESS, ...dataToPass }
            ];
            const store = mockStore({});
            return store.dispatch(getLanguages())
                .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
        xit('should dispatch request and success actions when fetchItems has been dispatched', () => {
            const serverReply = {
                status: 'ok',
                items: [{id: 1}, {id: 2}]
            };
            nock(ENDPOINT_HOST)
                .post(ENDPOINT_PATH)
                .reply(200, serverReply);

            let dataToPass = {...serverReply};
            delete dataToPass.status;
            
            const expectedActions = [
                { type: FETCH_ITEMS_REQUEST },
                { type: FETCH_ITEMS_SUCCESS, ...dataToPass }
            ];
            const store = mockStore({});
            return store.dispatch(fetchItems())
                .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
        xit('should dispatch request and success actions when addItem has been dispatched', () => {
            const serverReply = {
                status: 'ok'
            };
            nock(ENDPOINT_HOST)
                .post(ENDPOINT_PATH)
                .reply(200, serverReply);
            
            const expectedActions = [
                { type: ADD_ITEM_REQUEST },
                { type: ADD_ITEM_SUCCESS }
            ];
            const store = mockStore({});
            return store.dispatch(addItem())
                .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
        xit('should dispatch request and success actions when deleteItem has been dispatched', () => {
            const serverReply = {
                status: 'ok'
            };
            nock(ENDPOINT_HOST)
                .post(ENDPOINT_PATH)
                .reply(200, serverReply);
            
            const expectedActions = [
                { type: DELETE_ITEM_REQUEST },
                { type: DELETE_ITEM_SUCCESS }
            ];
            const store = mockStore({});
            return store.dispatch(addItem())
                .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
        xit('should dispatch request and success actions when saveItemField has been dispatched', () => {
            const serverReply = {
                status: 'ok'
            };
            nock(ENDPOINT_HOST)
                .post(ENDPOINT_PATH)
                .reply(200, serverReply);
            
            const expectedActions = [
                { type: SAVE_ITEM_FIELD_REQUEST },
                { type: SAVE_ITEM_FIELD_SUCCESS }
            ];
            const store = mockStore({});
            return store.dispatch(saveItemField())
                .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
        
    });
    
});
