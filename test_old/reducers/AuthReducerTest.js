import nock from 'nock';

import { login, logout } from '../src/actions/authActions';
import reducer from '../src/reducers/reducers';

const ENDPOINT_HOST = 'http://127.0.0.1';
const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';

describe('Auth reducer', () => {

    afterEach(() => {
        nock.cleanAll();
    }) 
    
    describe('login action', () => {
        
        it('handles a correct login', () => {
            nock(ENDPOINT_HOST)
                .post(ENDPOINT_PATH)
                .reply(200, { 
                    status: 'ok', 
                    authcode: '#authcode#'
                });
                
            const initialState = {
                app: {
                    statusMessage: ''
                },
                auth: {
                    isAuthenticated: false,
                    authcode: ''                    
                }
            }
            const nextState = reducer(initialState, login('admin', 'admin'));
            
            expect(nextState.auth.isAuthenticated).to.equal(true);
            expect(nextState.auth.authcode).to.equal('#authcode#');
            expect(nextState.app.statusMessage).to.equal('');
        });
        
        it('handles an incorrect login', () => {
            nock(ENDPOINT_HOST)
                .post(ENDPOINT_PATH)
                .reply(200, { 
                    status: 'ko', 
                    error: 'Username or password not valid.'
                });
                
            const initialState = {
                app: {
                    statusMessage: ''
                },
                auth: {
                    isAuthenticated: false,
                    authcode: ''                    
                }
            }
            const nextState = reducer(initialState, login('admin', 'foo'));
            
            expect(nextState.auth.isAuthenticated).to.equal(false);
            expect(nextState.auth.authcode).to.equal('');
            expect(nextState.app.statusMessage).to.equal('Username or password not valid.');
        });  

    });

    describe('logout action', () => {
        
        it('handles logout', () => {
            const initialState = {
                app: {
                    statusMessage: ''
                },
                auth: {
                    isAuthenticated: true,
                    authcode: '#authcode#'                    
                }
            }
            const nextState = reducer(initialState, logout());

            expect(nextState.auth.isAuthenticated).to.equal(false);
            expect(nextState.auth.authcode).to.equal('');
            expect(nextState.app.statusMessage).to.equal('');            
        });
        
    });
   
});