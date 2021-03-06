import { API_ENDPOINT } from '../config';
import fetch from 'isomorphic-fetch';

export function createAsyncAction(actionName, request, error, success) {
    
    const requestAction = request();
    let requestData = {...requestAction};
    delete requestData.type;
    
    let config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: actionName,
            data: requestData
        })
    };

	return dispatch => {
	    
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
		dispatch(request());

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.
        
        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us. 
        return fetch(API_ENDPOINT, config)
            .then(function(response){
                let json;
                if(!response.ok) {
                    dispatch(error(response.status + ' ' + response.statusText));
                } else {
                    json = response.json();
                }
                return(json);
            })
            .then(function(json){
                if( json ) {
                    if( json.status == 'ok') {
                        delete json.status;
                        dispatch(success(json));
                    } else if( json.status == 'ko') {
                        dispatch(error(json.description))
                    }
                }
            })
	};
}
