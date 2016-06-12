import nock from 'nock';
import {expect} from 'chai';

import { changeLanguage, setWindowHeight, getLangInfos } from '../../src/actions/appActions';
import reducer from '../../src/reducers/appReducer';

const ENDPOINT_HOST = 'http://127.0.0.1';
const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';

describe('App reducer', () => {

    afterEach(() => {
        nock.cleanAll();
    }) 
    
    describe('changeLanguage action', () => {
        
        it('changes language', () => {
            const initialState = {
                languages: ["it", "en", "de"],
                selectedLanguage: ''
            }
            const nextState = reducer(initialState, changeLanguage('it'));
            expect(nextState.selectedLanguage).to.equal('it');
        });    

    });

    describe('getLangInfos action', () => {
        
        it('gets the lang infos from server', () => {
            nock(ENDPOINT_HOST)
                .post(ENDPOINT_PATH)
                .reply(200, { 
                    status: 'ok', 
                    langInfos: [
                        {language: 'it'}, 
                        {language: 'en'}
                    ] 
                });
                
            const initialState = {
                languages: [],
                selectedLanguage: ''
            }
            const nextState = reducer(initialState, getLangInfos());
            expect(nextState.languages).to.equal([{language: 'it'}, {language: 'en'}]);            
            expect(nextState.selectedLanguage).to.equal('it');            
        });
        
    });

    describe('setWindowHeight action', () => {
        
        it('sets the window heigth', () => {
            const initialState = {
                windowHeight: 0
            }
            const nextState = reducer(initialState, setWindowHeight(300));
            expect(nextState.windowHeight).to.equal(300);            
        });
        
    });    
});