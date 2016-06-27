import { API_ENDPOINT } from '../config';
import fetch from 'isomorphic-fetch';

export const createAsyncAction = (actionName, data, request, error, success) => {
    
    let config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: actionName,
            ...data
        })
    };

    return dispatch => {
        
        dispatch(request());

        return fetch(API_ENDPOINT, config)
            .then(function(response){
                let json;
                if(!response.ok) {
                    dispatch(error(response.status + ' ' + response.statusText));
                } else {
                    json = response.json();
                }
                return(json);
            }).then(function(json){
                if( json ) {
                    if( json.status == 'ok') {
                        delete json.status;
                        dispatch(success(json));
                    } else if( json.status == 'ko') {
                        dispatch(error(json.serverErrorMessage))
                    }
                }
            }).catch(function(err){
                dispatch(error("JSON parsing error"))
            });
    };
}
