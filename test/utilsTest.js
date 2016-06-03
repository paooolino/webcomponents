/**
    Tests the behaviour of an async action created with the helper function "createAsyncAction"
    
    The createAsyncAction takes as parameters three string types of actions: request, error, success.
    
    The REQUEST is firstly dispatched with no data. Its purpose is simply to inform that the request has begun.
    
    The SUCCESS is dispatched if the fetch has been completed successfully. There's a payload of data in the action.
    
    in case of server response error:
        Check that the server response is not ok.
        The ERROR is dispatched with a description containing the response status and the status text.
    
    in case of response ok but request error:
        The server endpoint responds with such object
        {
            status: 'ko',
            description: 'The description of the error'
        }
        The ERROR is dispatched with the description provided by the server.
    
    in case of success:
        The server responds with such object
        {
            status: 'ok',
            whatever: any custom data structure
        }
        The SUCCESS is dispatched with a payload attribute containing the complete json returned by the server endpoint.
    
    For the purpose of this test, we use the very first call that shoud be done
    i.e., the getLangInfos action.
*/

const ENDPOINT_HOST = 'http://127.0.0.1';
const ENPOINT_PATH = '/webcomponents/server/src/endpoint.php';

import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';

import { getLangInfos, 
    GET_LANG_INFOS_REQUEST, GET_LANG_INFOS_FAILURE, GET_LANG_INFOS_SUCCESS
} from '../src/actions/appActions';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('createAsyncAction', () => {
    afterEach(() => {
        nock.cleanAll();
    })    
    
    it('call the SUCCESS action when the response status is ok', () => {
        nock(ENDPOINT_HOST)
            .post(ENPOINT_PATH)
            .reply(200, { status: 'ok' } )
        
        const store = mockStore({});

        return store.dispatch(getLangInfos())
            .then(() => {
                const actions = store.getActions();
                expect(actions.length).toBe(2);
                expect(actions[0].type).toBe(GET_LANG_INFOS_REQUEST);
                expect(actions[1].type).toBe(GET_LANG_INFOS_SUCCESS);
            });
    });
    
    it('call the FAILURE action when the response status is ko', () => {
        nock('http://127.0.0.1')
            .post('/webcomponents/server/src/endpoint.php')
            .reply(200, { status: 'ko', description: 'whatever message from the endpoint' } )
        
        const store = mockStore({});

        return store.dispatch(getLangInfos())
            .then(() => {
                const actions = store.getActions();
                expect(actions.length).toBe(2);
                expect(actions[0].type).toBe(GET_LANG_INFOS_REQUEST);
                expect(actions[1].type).toBe(GET_LANG_INFOS_FAILURE);
                expect(actions[1].description).toBe('whatever message from the endpoint');
            });
    });
    
    it('call the FAILURE action with the server error description when the response status is ko', () => {
        nock('http://127.0.0.1')
            .post('/webcomponents/server/src/endpoint.php')
            .reply(500)
        
        const store = mockStore({});

        return store.dispatch(getLangInfos())
            .then(() => {
                const actions = store.getActions();
                expect(actions.length).toBe(2);
                expect(actions[0].type).toBe(GET_LANG_INFOS_REQUEST);
                expect(actions[1].type).toBe(GET_LANG_INFOS_FAILURE);
                expect(actions[1].description).toBe('500 Internal Server Error');
            });
    });
});