import expect from 'expect';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions/itemsActions';

const mockStore = configureMockStore([thunk]);
const ENDPOINT_HOST = 'http://127.0.0.1';
const ENPOINT_PATH = '/webcomponents/server/src/endpoint.php';

describe('Items actions', () => {
    
    afterEach(() => {
        nock.cleanAll();
    });
    
    it('should create FETCH_ITEMS_SUCCESS when fetchItems has been dispatched', () => {
        const items = [{ 
            id: 1 
        },{
            id: 2
        }];
        nock(ENDPOINT_HOST)
            .post(ENPOINT_PATH)
            .reply(200, {
                status: 'ok',
                items
            });

        const expectedActions = [
            { type: actions.FETCH_ITEMS_REQUEST },
            { type: actions.FETCH_ITEMS_SUCCESS, items }
        ];
        const store = mockStore({});
        return store.dispatch(actions.fetchItems())
            .then(() => { // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
    
    it('should create an action to select an item', () => {
        const expectedAction = {
            type: actions.SELECT_ITEM,
            id: 1
        }
        expect(actions.selectItem(1)).toEqual(expectedAction);
    });
    
    it('should create ADD_ITEM_SUCCESS when addItem has been dispatched', () => {
        nock(ENDPOINT_HOST)
            .post(ENPOINT_PATH)
            .reply(200, {
                status: 'ok',
                last_id: 3
            });

        const expectedActions = [
            { type: actions.ADD_ITEM_REQUEST },
            { type: actions.ADD_ITEM_SUCCESS, last_id: 3 }
        ];
        const store = mockStore({});
        return store.dispatch(actions.addItem())
            .then(() => { // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });    
    });
    
    it('should create DELETE_ITEM_SUCCESS when deleteItem has been dispatched', () => {
        nock(ENDPOINT_HOST)
            .post(ENPOINT_PATH)
            .reply(200, {
                status: 'ok',
                affected_rows: 1
            });

        const expectedActions = [
            { type: actions.DELETE_ITEM_REQUEST },
            { type: actions.DELETE_ITEM_SUCCESS, affected_rows: 1 }
        ];
        const store = mockStore({});
        return store.dispatch(actions.deleteItem())
            .then(() => { // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
    
    it('should create SAVE_ITEM_FIELD_SUCCESS when saveItemField has been dispatched', () => {
        nock(ENDPOINT_HOST)
            .post(ENPOINT_PATH)
            .reply(200, {
                status: 'ok',
                affected_rows: 1
            });

        const expectedActions = [
            { type: actions.SAVE_ITEM_FIELD_REQUEST },
            { type: actions.SAVE_ITEM_FIELD_SUCCESS, affected_rows: 1 }
        ];
        const store = mockStore({});
        return store.dispatch(actions.saveItemField())
            .then(() => { // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
    
});