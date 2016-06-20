/*
    external imports
*/
import expect from 'expect';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

/*
    internal imports
*/
import { createAsyncAction } from '../src/utils';

/*
    setup
*/
const ENDPOINT_HOST = 'http://127.0.0.1';
const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

/*
    mocking actions types
*/
const MOCKACTION_REQUEST = 'MOCKACTION_REQUEST';
const MOCKACTION_FAILURE = 'MOCKACTION_FAILURE';
const MOCKACTION_SUCCESS = 'MOCKACTION_SUCCESS';
const MOCKACTION = 'MOCKACTION';

/*
    mocking creators
*/
const mockAction_request = () => ({
    type: MOCKACTION_REQUEST
});
const mockAction_failure = (errorMessage) => ({
    type: MOCKACTION_FAILURE,
    errorMessage: 'Error while mockAction: ' + errorMessage
});
const mockAction_success = (serverData) => ({
    type: MOCKACTION_SUCCESS,
    ...serverData
});
const mockAction = (param1, param2) => {
    return createAsyncAction(
        MOCKACTION,
        {param1, param2},
        mockAction_request, mockAction_failure, mockAction_success
    );
}

/*
    tests
*/
describe('[utils_spec]', () => {

    afterEach(() => {
        nock.cleanAll();
    });
        
    it('passes the parameters to the server', () => {
        nock(ENDPOINT_HOST).post(ENDPOINT_PATH)
            .reply(200, function(uri, requestBody){
                expect(requestBody.param1).toBe('value1');
                expect(requestBody.param2).toBe('value2');
                return requestBody;
            });
           
        const store = mockStore({});

        return store.dispatch(mockAction('value1', 'value2'));
    });
    
    it('passes the serverData fields to SUCCESS action', () => {
        nock(ENDPOINT_HOST).post(ENDPOINT_PATH)
            .reply(200, { 
                status: 'ok',
                serverField1: 'value 1',
                serverField2: 'value 2'
            });  

        const store = mockStore({});
        
        const expectedAction = {
            type: MOCKACTION_SUCCESS,
            serverField1: 'value 1',
            serverField2: 'value 2'
        };
        
        return store.dispatch(mockAction())
            .then(() => {
                const actions = store.getActions();
                
                expect(actions[1]).toEqual(expectedAction);
            });
    });
    
    it('calls the SUCCESS action when the response status is ok', () => {
        nock(ENDPOINT_HOST).post(ENDPOINT_PATH)
            .reply(200, { status: 'ok' } );  

        const store = mockStore({});
        
        return store.dispatch(mockAction())
            .then(() => {
                const actions = store.getActions();
                
                expect(actions.length).toBe(2);
                expect(actions[0].type).toBe('MOCKACTION_REQUEST');
                expect(actions[1].type).toBe('MOCKACTION_SUCCESS');
            });
    });
    
    it('calls the FAILURE action when the response status is ko, and pass the serverErrorMessage', () => {
        const serverErrorMessage = 'whatever message from the endpoint';
        nock(ENDPOINT_HOST).post(ENDPOINT_PATH)
            .reply(200, { status: 'ko', serverErrorMessage });

        const store = mockStore({});

        return store.dispatch(mockAction())
            .then(() => {
                const actions = store.getActions();
                
                expect(actions.length).toBe(2);
                expect(actions[0].type).toBe('MOCKACTION_REQUEST');
                expect(actions[1].type).toBe('MOCKACTION_FAILURE');
                expect(actions[1].errorMessage).toBe('Error while mockAction: ' + serverErrorMessage);
            });
    });
    
    it('calls the FAILURE when server call fails and pass the error codes', () => {
        nock(ENDPOINT_HOST).post(ENDPOINT_PATH)
            .reply(500);

        const store = mockStore({});

        return store.dispatch(mockAction())
            .then(() => {
                const actions = store.getActions();
                
                expect(actions.length).toBe(2);
                expect(actions[0].type).toBe('MOCKACTION_REQUEST');
                expect(actions[1].type).toBe('MOCKACTION_FAILURE');
                expect(actions[1].errorMessage).toBe('Error while mockAction: 500 Internal Server Error');
            });        
    });
    
    it('calls the FAILURE action when the response is not a JSON', () => {
        nock(ENDPOINT_HOST).post(ENDPOINT_PATH)
            .reply(200, "Parse error: syntax error, unexpected T_PAAMAYIM_NEKUDOTAYIM");

        const store = mockStore({});

        return store.dispatch(mockAction())
            .then(() => {
                const actions = store.getActions();
                
                expect(actions.length).toBe(2);
                expect(actions[0].type).toBe('MOCKACTION_REQUEST');
                expect(actions[1].type).toBe('MOCKACTION_FAILURE');
                expect(actions[1].errorMessage).toBe('Error while mockAction: JSON parsing error');
            });   
    });
    
});
