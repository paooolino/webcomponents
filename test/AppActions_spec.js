import expect from 'expect';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {CHANGE_LANGUAGE, LOGOUT} from '../src/actions/AppActions';
import {GET_LANGUAGES_REQUEST, GET_LANGUAGES_FAILURE, GET_LANGUAGES_SUCCESS} from '../src/actions/AppActions';
import {changeLanguage, logout} from '../src/actions/AppActions';
import {getLanguagesRequest, getLanguagesFailure, getLanguagesSuccess} from '../src/actions/AppActions';

const mockStore = configureMockStore([thunk]);
const ENDPOINT_HOST = 'http://127.0.0.1';
const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';

describe('App actions', () => {

    afterEach(() => {
        nock.cleanAll();
    });
    
    xit('should create an action to change language', () => {
        const expectedAction = {
            type: CHANGE_LANGUAGE,
            newLanguage: 'it'
        }
        expect(changeLanguage('it')).toEqual(expectedAction);
    });
    
    xit('should create an action to logout', () => {
        const expectedAction = {
            type: LOGOUT,
            newLanguage: 'it'
        }
        expect(logout('it')).toEqual(expectedAction);
    });
    
    xit('should create an async action to change language', () => {});
    
    xit('should create request and success actions when getLanguages has been dispatched', () => {
        const serverReply = {
            status: 'ok',
            languages: ['it', 'en']
        };
        nock(ENDPOINT_HOST)
            .post(ENDPOINT_PATH)
            .reply(200, serverReply);

        const expectedActions = [
            { type: actions.GET_LANGUAGES_REQUEST },
            { type: actions.GET_LANGUAGES_SUCCESS, languages: serverReply.languages }
        ];
        const store = mockStore({});
        return store.dispatch(actions.getLanguages())
            .then(() => { // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });
    
});
