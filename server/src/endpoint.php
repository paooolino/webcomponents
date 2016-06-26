<?php

// read raw post data
$json = file_get_contents('php://input');
$ARR = json_decode($json, true);  

echo json_encode(server($ARR));

function server($ARR) {
    
    switch( $ARR["action"] ) {
        
        case "login":
            return array(
                "status" => "ok",
                "authCode" => "whatever_auth_code"
            );
            
        default:
            return array(
                "status" => "ko",
                "description" => "No valid action"
            );
    }
    
}