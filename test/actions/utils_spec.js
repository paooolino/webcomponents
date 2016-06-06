import expect from 'expect';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { createAsyncAction } from '../../src/actions/utils';

const ENDPOINT_HOST = 'http://127.0.0.1';
const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Action utils', () => {
    
    const actionRequest = () => ({ type: 'ACTION_REQUEST' });
    const actionFailure = (errorMessage) => ({ type: 'ACTION_FAILURE', errorMessage });
    const actionSuccess = () => ({ type: 'ACTION_SUCCESS' });
    
    const asyncAction = createAsyncAction(
        "aysncActionName",
        actionRequest, actionFailure, actionSuccess
    );
    
    describe('createAsyncAction', () => {
        
        it('should return a function', () => {
            expect(asyncAction).toBeA('function');
        });
        
    });
    
    describe('createAsyncAction dispatch', () => {

        afterEach(() => {
            nock.cleanAll();
        })  
    
        it('calls the SUCCESS action when the response status is ok', () => {
            nock(ENDPOINT_HOST).post(ENDPOINT_PATH)
                .reply(200, { status: 'ok' } );
                
            const store = mockStore({});

            return store.dispatch(asyncAction)
                .then(() => {
                    const actions = store.getActions();
                    
                    expect(actions.length).toBe(2);
                    expect(actions[0].type).toBe('ACTION_REQUEST');
                    expect(actions[1].type).toBe('ACTION_SUCCESS');
                });
        });
        
        it('calls the FAILURE action when the response status is ko, and pass the errorMessage', () => {
            nock(ENDPOINT_HOST).post(ENDPOINT_PATH)
                .reply(200, { status: 'ko', description: 'whatever message from the endpoint' });

            const store = mockStore({});

            return store.dispatch(asyncAction)
                .then(() => {
                    const actions = store.getActions();
                    
                    expect(actions.length).toBe(2);
                    expect(actions[0].type).toBe('ACTION_REQUEST');
                    expect(actions[1].type).toBe('ACTION_FAILURE');
                    expect(actions[1].errorMessage).toBe('whatever message from the endpoint');
                });
        });
        
        it('calls the FAILURE action with the server error description when the response status is ko, and pass the errorMessage', () => {
            nock(ENDPOINT_HOST).post(ENDPOINT_PATH)
                .reply(500);
                
            const store = mockStore({});

            return store.dispatch(asyncAction)
                .then(() => {
                    const actions = store.getActions();
                    
                    expect(actions.length).toBe(2);
                    expect(actions[0].type).toBe('ACTION_REQUEST');
                    expect(actions[1].type).toBe('ACTION_FAILURE');
                    expect(actions[1].errorMessage).toBe('500 Internal Server Error');
                });
        });
        
    });
    
});
