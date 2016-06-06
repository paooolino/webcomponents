import expect from 'expect';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions/AuthActions';

const mockStore = configureMockStore([thunk]);
const ENDPOINT_HOST = 'http://127.0.0.1';
const ENPOINT_PATH = '/webcomponents/server/src/endpoint.php';

describe('Auth actions', () => {

    afterEach(() => {
        nock.cleanAll();
    })
    
    it('should create LOGIN_SUCCESS when login action has been dispatched', () => {
        nock(ENDPOINT_HOST)
            .post(ENPOINT_PATH)
            .reply(200, {
                status: 'ok',
                authcode: '#user_authcode#'
            });

        const expectedActions = [
            { type: actions.LOGIN_REQUEST },
            { type: actions.LOGIN_SUCCESS, authcode: '#user_authcode#' }
        ];
        const store = mockStore({});
        return store.dispatch(actions.login('admin', 'admin'))
            .then(() => { // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })        
    });
    
    it('should create an action to logout', () => {
        const expectedAction = {
            type: actions.LOGOUT,
        }
        expect(actions.logout()).toEqual(expectedAction);        
    });
    
});