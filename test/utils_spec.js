/*
*/
import expect from 'expect';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

/*
*/
import { createAsyncAction } from '../src/utils';



const ENDPOINT_HOST = 'http://127.0.0.1';
const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);



// mocking actions types
const MOCKACTION_REQUEST = 'MOCKACTION_REQUEST';
const MOCKACTION_FAILURE = 'MOCKACTION_FAILURE';
const MOCKACTION_SUCCESS = 'MOCKACTION_SUCCESS';
const MOCKACTION = 'MOCKACTION';

// mocking creators
const mockAction_request = () => {
    type: MOCKACTION_REQUEST
};
const mockAction_failure = () => {
    type: MOCKACTION_FAILURE
};
const mockAction_success = () => {
    type: MOCKACTION_SUCCESS
};
const mockAction = (param1, param2) => {
    return createAsyncAction(
        MOCKACTION,
        {param1, param2},
        mockAction_request, mockAction_failure, mockAction_success
    );
}



describe('Action utils', () => {
    
    it('passes the parameters to the server', () => {
            
    });
    
    it('calls the SUCCESS action when the response status is ok', () => {
        
    });
    
    it('calls the FAILURE action when the response status is ko, and pass the errorMessage', () => {
        
    });
    
    it('calls the FAILURE action with the server error description when the response status is ko, and pass the errorMessage', () => {
        
    });
    
    it('calls the FAILURE action when the response is not a JSON', () => {
        
    });
    
});