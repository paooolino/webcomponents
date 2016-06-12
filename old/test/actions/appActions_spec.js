import expect from 'expect';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions/appActions';

const mockStore = configureMockStore([thunk]);
const ENDPOINT_HOST = 'http://127.0.0.1';
const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';

describe('App actions', () => {
    
    afterEach(() => {
        nock.cleanAll();
    });
  
    it('should create GET_LANGUAGES_SUCCESS when getLanguages has been dispatched', () => {
        nock(ENDPOINT_HOST)
            .post(ENDPOINT_PATH)
            .reply(200, {
                status: 'ok',
                languages: [{ lang: 'it' },{ lang: 'en' }]
            });

        const expectedActions = [
            { type: actions.GET_LANGUAGES_REQUEST },
            { type: actions.GET_LANGUAGES_SUCCESS, languages: [{ lang: 'it' },{ lang: 'en' }] }
        ];
        const store = mockStore({});
        return store.dispatch(actions.getLanguages())
            .then(() => { // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });
    
    it('should create an action to change language', () => {
        const expectedAction = {
            type: actions.CHANGE_LANGUAGE,
            newLanguage: 'it'
        }
        expect(actions.changeLanguage('it')).toEqual(expectedAction);
    });
    
});