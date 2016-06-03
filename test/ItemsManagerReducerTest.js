import nock from 'nock';

import { changeLanguage, setWindowHeight, getLangInfos } from '../src/actions/itemsManagerActions';
import reducer from '../src/reducers/reducers';

const ENDPOINT_HOST = 'http://127.0.0.1';
const ENPOINT_PATH = '/webcomponents/server/src/endpoint.php';

describe('ItemsManager reducer', () => {

    afterEach(() => {
        nock.cleanAll();
    }) 
    
});