<?php

// read raw post data
$json = file_get_contents('php://input');
$ARR = json_decode($json, true);  

echo json_encode(server($ARR));

function server($ARR) {
    
    switch( $ARR["action"] ) {
        
        case "login":
            if( $ARR["username"] == "admin" && $ARR["password"] == "admin" ) {
                return array(
                    "status" => "ok",
                    "authCode" => "whatever_auth_code"
                );
            } else {
                return array(
                    "status" => "ko",
                    "errorMessage" => "Invalid credentials."
                );
            }
            
        default:
            return array(
                "status" => "ko",
                "errorMessage" => "No valid action"
            );
    }
    
}