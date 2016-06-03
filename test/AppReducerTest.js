import nock from 'nock';

import { changeLanguage, setWindowHeight, getLangInfos } from '../src/actions/appActions';
import reducer from '../src/reducers/reducers';

const ENDPOINT_HOST = 'http://127.0.0.1';
const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';

describe('App reducer', () => {

    afterEach(() => {
        nock.cleanAll();
    }) 
    
    describe('changeLanguage action', () => {
        
        it('changes language', () => {
            const initialState = {
                app: {
                    languages: ["it", "en", "de"],
                    selectedLanguage: ''
                }
            }
            const nextState = reducer(initialState, changeLanguage('it'));
            expect(nextState.app.selectedLanguage).to.equal('it');
        });    

    });

    describe('getLangInfos action', () => {
        
        it('gets the lang infos from server', () => {
            nock(ENDPOINT_HOST)
                .post(ENDPOINT_PATH)
                .reply(200, { 
                    status: 'ok', 
                    langInfos: [
                        {language:'it'}, 
                        {language:'en'}
                    ] 
                });
                
            const initialState = {
                app: {
                    languages: [],
                    selectedLanguage: ''
                }
            }
            const nextState = reducer(initialState, getLangInfos());
            expect(nextState.app.languages).to.equal(['it', 'en']);            
            expect(nextState.app.selectedLanguage).to.equal('it');            
        });
        
    });

    describe('setWindowHeight action', () => {
        
        it('sets the window heigth', () => {
            const initialState = {
                app: {
                    windowHeight: 0
                }
            }
            const nextState = reducer(initialState, setWindowHeight(300));
            expect(nextState.app.windowHeight).to.equal(300);            
        });
        
    });    
});