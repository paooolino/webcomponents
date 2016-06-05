import expect from 'expect';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/actions/AppActions';

const mockStore = configureMockStore([thunk]);
const ENDPOINT_HOST = 'http://127.0.0.1';
const ENPOINT_PATH = '/webcomponents/server/src/endpoint.php';

describe('App actions', () => {
    
    afterEach(() => {
        nock.cleanAll();
    })
  
    it('should create GET_LANGUAGE_INFOS_SUCCESS when the request has been done', () => {
        nock(ENDPOINT_HOST)
            .post(ENPOINT_PATH)
            .reply(200, {
                status: 'ok',
                languageInfos: [{ lang: 'it' },{ lang: 'en' }]
            });

        const expectedActions = [
            { type: actions.GET_LANGUAGE_INFOS_REQUEST },
            { type: actions.GET_LANGUAGE_INFOS_SUCCESS, languageInfos: [{ lang: 'it' },{ lang: 'en' }] }
        ];
        const store = mockStore({});
        return store.dispatch(actions.getLanguageInfos())
            .then(() => { // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });
    
    it('should create an action change language', () => {
        const expectedAction = {
            type: actions.CHANGE_LANGUAGE,
            newLanguage: 'it'
        }
        expect(actions.changeLanguage('it')).toEqual(expectedAction);
    });
    
});