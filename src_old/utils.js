import { API_ENDPOINT } from '../config';
import fetch from 'isomorphic-fetch';

export function createAsyncAction(actionName, request, error, success) {
    
    const requestAction = request();
    let requestData = {...requestAction};
    delete requestData.type;
    
    const config = {
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
            });
    }
};
