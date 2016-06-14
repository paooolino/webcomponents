import expect from 'expect';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {CHANGE_LANGUAGE, LOGOUT} from '../../src/App/AppActions';
import {GET_LANGUAGES_REQUEST, GET_LANGUAGES_FAILURE, GET_LANGUAGES_SUCCESS} from '../../src/App/AppActions';
import {changeLanguage, logout, getLanguages} from '../../src/App/AppActions';
import {getLanguagesRequest, getLanguagesFailure, getLanguagesSuccess} from '../../src/App/AppActions';

const mockStore = configureMockStore([thunk]);
const ENDPOINT_HOST = 'http://127.0.0.1';
const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';

describe('[App/AppActions_spec]', () => {

    afterEach(() => {
        nock.cleanAll();
    });
    
    describe('Sync action creators', () => {
        
        it('should create an action to change language', () => {
            const expectedAction = {
                type: CHANGE_LANGUAGE,
                newLanguage: 'it'
            }
            expect(changeLanguage('it')).toEqual(expectedAction);
        });    

        it('should create an action to logout', () => {
            const expectedAction = {
                type: LOGOUT
            }
            expect(logout()).toEqual(expectedAction);
        });

        it('should create an action to request languages', () => {
            const expectedAction = {
                type: GET_LANGUAGES_REQUEST
            }
            expect(getLanguagesRequest()).toEqual(expectedAction);
        });

        it('should create an action to fail the languages request', () => {
            const expectedAction = {
                type: GET_LANGUAGES_FAILURE,
                errorMessage: 'Whatever error message.'
            }
            expect(getLanguagesFailure('Whatever error message.')).toEqual(expectedAction);
        });

        it('should create an action to success request languages', () => {
            const expectedAction = {
                type: GET_LANGUAGES_SUCCESS,
                languages: ['it', 'en']
            }
            expect(getLanguagesSuccess({languages:['it', 'en']})).toEqual(expectedAction);
        });      
        
    });

    describe('Async action creators', () => {
        
        it('should create an async action to get languages', () => {
            expect(getLanguages()).toBeA('function');
        });
        
        it('should dispatch request and success actions when getLanguages has been dispatched', () => {
            const serverReply = {
                status: 'ok',
                languages: ['it', 'en']
            };
            nock(ENDPOINT_HOST)
                .post(ENDPOINT_PATH)
                .reply(200, serverReply);

            let dataToPass = {...serverReply};
            delete dataToPass.status;
            
            const expectedActions = [
                { type: GET_LANGUAGES_REQUEST },
                { type: GET_LANGUAGES_SUCCESS, ...dataToPass }
            ];
            const store = mockStore({});
            return store.dispatch(getLanguages())
                .then(() => { // return of async actions
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
    
    });

});
