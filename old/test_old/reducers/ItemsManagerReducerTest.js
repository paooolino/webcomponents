import nock from 'nock';

import { fetchItems, addItem, deleteItem, selectItem, updateItemField, saveItemField } from '../src/actions/itemsManagerActions';
import reducer from '../src/reducers/reducers';

const ENDPOINT_HOST = 'http://127.0.0.1';
const ENPOINT_PATH = '/webcomponents/server/src/endpoint.php';

describe('ItemsManager reducer', () => {

    afterEach(() => {
        nock.cleanAll();
    }) 
    
    describe('fetchItems action', () => {
        
        it('handles the root fetchItems', () => {
            nock(ENDPOINT_HOST)
                .post(ENDPOINT_PATH)
                .reply(200, { 
                    status: 'ok', 
                    items: [{
                        id: 1,
                        name: 'item 1',
                        slug: 'item-1'
                    },{
                        id: 2,
                        name: 'item 2',
                        slug: 'item-2'
                    }],
                    ancestors: []
                });
            const initialState = {
                items: {
                    loadedItems: [],
                    selectedItemId: 0,
                    ancestors: []
                }
            }
            const nextState = reducer(initialState, fetchItems(0));   
            
            expect(nextState.items.loadedItems.length).to.equal(2);
            expect(nextState.items.loadedItems.ancestors.length).to.equal(0);
        });
        
        it('handles the level-1 child fetchItems', () => {
            nock(ENDPOINT_HOST)
                .post(ENDPOINT_PATH)
                .reply(200, { 
                    status: 'ok', 
                    items: [{
                        id: 3,
                        name: 'item 3',
                        slug: 'item-3'
                    }],
                    ancestors: [{
                        id: 1,
                        name: 'item 1',
                        slug: 'item-1'
                    }]
                });
            const initialState = {
                items: {
                    loadedItems: [{
                        id: 1,
                        name: 'item 1',
                        slug: 'item-1'
                    },{
                        id: 2,
                        name: 'item 2',
                        slug: 'item-2'
                    }],
                    selectedItemId: 0,
                    ancestors: []
                }
            }
            const nextState = reducer(initialState, fetchItems(1));   
            
            expect(nextState.items.loadedItems.length).to.equal(1);
            expect(nextState.items.loadedItems.ancestors.length).to.equal(1);
        });
        
    });
    
    describe('addItem action', () => {
        
        it('adds the first item', () => {
            nock(ENDPOINT_HOST)
                .post(ENDPOINT_PATH)
                .reply(200, 1);   
            const initialState = {
                items: {
                    loadedItems: [],
                    selectedItemId: 0
                }
            }                
            const nextState = reducer(initialState, addItem(0, 'it')); 
            expect(nextState.items.loadedItems).to.equal([{
                
            }]);
        });
            
    });
    
    describe('deleteItem action', () => {});
    
    describe('selectItem action', () => {});
    
    describe('updateItemField action', () => {});
    
    describe('saveItemField action', () => {});
});