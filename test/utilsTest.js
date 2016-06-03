/**
    The expected result from the endpoint is an object containing
    {
        status: 'ok|ko',
        error: 'In case of ko, an error description',
        whatever: 'In case of ok, whatever requested data'
    }
    
    for the purpose of this test, we use the very first call that shoud be done
    i.e., the getLangInfos action.
    
    The createAsyncAction will return an action of type success/error
    and an errorMessage in case of failure
    or the entire response json if ok.
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
            .reply(200, { status: 'ko', error: 'whatever message from the endpoint' } )
        
        const store = mockStore({});

        return store.dispatch(getLangInfos())
            .then(() => {
                const actions = store.getActions();
                expect(actions.length).toBe(2);
                expect(actions[0].type).toBe(GET_LANG_INFOS_REQUEST);
                expect(actions[1].type).toBe(GET_LANG_INFOS_FAILURE);
                expect(actions[1].errorMessage).toBe('whatever message from the endpoint');
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
                expect(actions[1].errorMessage).toBe('500 Internal Server Error');
            });
    });
});