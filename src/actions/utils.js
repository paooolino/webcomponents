import { API_ENDPOINT } from '../config';
import fetch from 'isomorphic-fetch';

// assuming that:
//  - server expects raw POST data in which there is an "action" name and a "data" object.
//  - server responds with a json in which a status field is "ok" or "ko".
//  - if status is "ko" a field "error" is valorized with an error message.

export function createAsyncAction(actionName, data, request, error, success) {
    
    let config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: actionName,
            data
        })
    };

	return dispatch => {
	    
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
		dispatch({
		    type: request
		});

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.
        
        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us. 
        return fetch(API_ENDPOINT, config)
            .then(function(response){
                let json;
                if(!response.ok) {
                    dispatch({
                        type: error,
                        payload: {
                            errorMessage: response.status + ' ' + response.statusText
                        }
                    });
                } else {
                    json = response.json();
                }
                return(json);
            })
            .then(function(json){
                if( json.status == 'ok') {
                    dispatch({
                        type: success,
                        payload: json
                    });
                } else if( json.status == 'ko') {
                    dispatch({
                        type: error,
                        payload: {
                            errorMessage: json.error
                        }
                    });
                }
            })/*
            .catch(err => {
                console.log(err);
                dispatch({
                    type: error,
                    payload: {
                        errorMessage: err.message
                    }
                });
    		})*/;
	};
}
