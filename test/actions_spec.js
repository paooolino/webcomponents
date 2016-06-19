/* external imports */
import expect from 'expect';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/* internal imports */
import { types, creators } from '../src/actions';

const mockStore = configureMockStore([thunk]);
const ENDPOINT_HOST = 'http://127.0.0.1';
const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';

describe('[actions_spec]', () => {
    
    it('should export the correct Types', () => {
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
        expect(Object.keys(types)).toEqual(expectedTypes);
    });
    
    it('should export the correct Creators', () => {
        const expectedCreators = [
            'changeLanguage',
            'logout',
            'selectItem',
            
            'loginRequest',
            'loginFailure',
            'loginSuccess',
            'login',
            
            'getLanguagesRequest',
            'getLanguagesFailure',
            'getLanguagesSuccess',
            'getLanguages',
            
            'fetchItemsRequest',
            'fetchItemsFailure',
            'fetchItemsSuccess',
            'fetchItems',
            
            'addItemRequest',
            'addItemFailure',
            'addItemSuccess',
            'addItem',
            
            'deleteItemRequest',
            'deleteItemFailure',
            'deleteItemSuccess',
            'deleteItem',
            
            'saveItemFieldRequest',
            'saveItemFieldFailure',
            'saveItemFieldSuccess',
            'saveItemField'
                        
        ];
        expect(Object.keys(creators)).toEqual(expectedCreators);
    });
    
    describe('Sync action creators', () => {
        
        it('should create an action to change language', () => {
            expect(creators.changeLanguage('it')).toEqual({
                type: types.CHANGE_LANGUAGE,
                newLanguage: 'it'
            });
        });
        
        it('should create an action to logout', () => {
            expect(creators.logout()).toEqual({
                type: types.LOGOUT
            });
        });
        
        it('should create an action to select an item', () => {
            const item_id = 3;
            expect(creators.selectItem(item_id)).toEqual({
                type: types.SELECT_ITEM,
                item_id
            });
        });
        
        describe('login', () => {
            
            it('should create an action to request a login', () => {
                expect(creators.loginRequest()).toEqual({
                    type: types.LOGIN_REQUEST
                });
            });
            it('should create an action to fail a login', () => {
                const errorMessage = 'whatever error message';
                expect(creators.loginFailure(errorMessage)).toEqual({
                    type: types.LOGIN_FAILURE,
                    errorMessage
                });
            });
            it('should create an action to success a login', () => {
                expect(creators.loginSuccess()).toEqual({
                    type: types.LOGIN_SUCCESS
                });
            });
            
        });
        
        describe('getLanguages', () => {
            
            it('should create an action to request a get languages', () => {
                expect(creators.getLanguagesRequest()).toEqual({
                    type: types.GET_LANGUAGES_REQUEST
                });
            });
            it('should create an action to fail a get languages', () => {
                const errorMessage = 'whatever error message';
                expect(creators.getLanguagesFailure(errorMessage)).toEqual({
                    type: types.GET_LANGUAGES_FAILURE,
                    errorMessage
                });
            });
            it('should create an action to success a get languages', () => {
                const serverData = { languages: ['it', 'en'] };
                expect(creators.getLanguagesSuccess(serverData)).toEqual({
                    type: types.GET_LANGUAGES_SUCCESS,
                    languages: serverData.languages
                });
            });
            
        });
        
        describe('fetchItems', () => {
            
            it('should create an action to request an items fetch', () => {
                expect(creators.fetchItemsRequest()).toEqual({
                    type: types.FETCH_ITEMS_REQUEST
                });
            });
            it('should create an action to fail an items fetch', () => {
                const errorMessage = 'whatever error message';
                expect(creators.fetchItemsFailure(errorMessage)).toEqual({
                    type: types.FETCH_ITEMS_FAILURE,
                    errorMessage
                });            
            });
            it('should create an action to success an items fetch', () => {
                const items = [{id: 1}, {id: 2}];
                expect(creators.fetchItemsSuccess(items)).toEqual({
                    type: types.FETCH_ITEMS_SUCCESS,
                    items
                });
            });
            
        });
        
        describe('addItem', () => {
            
            it('should create an action to request an item addition', () => {
                expect(creators.addItemRequest()).toEqual({
                    type: types.ADD_ITEM_REQUEST
                });
            });
            it('should create an action to fail an item addition', () => {
                const errorMessage = 'whatever error message';
                expect(creators.addItemFailure(errorMessage)).toEqual({
                    type: types.ADD_ITEM_FAILURE,
                    errorMessage
                });   
            });
            it('should create an action to success an item addition', () => {
                expect(creators.addItemSuccess()).toEqual({
                    type: types.ADD_ITEM_SUCCESS
                });
            });
            
        });
        
        describe('deleteItem', () => {
            it('should create an action to request an item deletion', () => {
                const id = 1;
                expect(creators.deleteItemRequest(id)).toEqual({
                    type: types.DELETE_ITEM_REQUEST
                });
            });
            it('should create an action to fail an item deletion', () => {
                const errorMessage = 'whatever error message';
                expect(creators.deleteItemFailure(errorMessage)).toEqual({
                    type: types.DELETE_ITEM_FAILURE,
                    errorMessage
                });  
            });
            it('should create an action to success an item deletion', () => {
                expect(creators.deleteItemSuccess()).toEqual({
                    type: types.DELETE_ITEM_SUCCESS
                });
            });
        });
        
        describe('saveItemField', () => {
            it('should create an action to request an item field save', () => {
                expect(creators.saveItemFieldRequest()).toEqual({
                    type: types.SAVE_ITEM_FIELD_REQUEST
                });
            });
            it('should create an action to fail an item field save', () => {
                const errorMessage = 'whatever error message';
                expect(creators.saveItemFieldFailure(errorMessage)).toEqual({
                    type: types.SAVE_ITEM_FIELD_FAILURE,
                    errorMessage
                });  
            });
            it('should create an action to success an item field save', () => {
                expect(creators.saveItemFieldSuccess()).toEqual({
                    type: types.SAVE_ITEM_FIELD_SUCCESS
                });
            });   
        });
        
    });
    
    describe('Async action creators', () => {
        
        // just check if they are functions
        xit('should create an async action to login', () => {
             expect(creators.login()).toBeA('function');
        });
        xit('should create an async action to get languages', () => {
             expect(creators.getLanguages()).toBeA('function');
        });
        xit('should create an async action to fetch items', () => {
             expect(creators.fetchItems()).toBeA('function');
        });
        xit('should create an async action to add an item', () => {
             expect(creators.addItem()).toBeA('function');
        });
        xit('should create an async action to delete an item', () => {
             expect(creators.deleteItem()).toBeA('function');
        });
        xit('should create an async action to save an item field', () => {
             expect(creators.saveItemField()).toBeA('function');
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
                { type: types.LOGIN_REQUEST },
                { type: types.LOGIN_SUCCESS }
            ];
            const store = mockStore({});
            const username = 'admin';
            const password = 'admin';
            return store.dispatch(creators.login(username, password))
                .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })          
        });
        it('should dispatch request and success actions when requestLanguages has been dispatched', () => {
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
                { type: types.GET_LANGUAGES_REQUEST },
                { type: types.GET_LANGUAGES_SUCCESS, ...dataToPass }
            ];
            const store = mockStore({});
            return store.dispatch(creators.getLanguages())
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
