<?php

// read raw post data
$json = file_get_contents('php://input');
$ARR = json_decode($json, true);  
    
echo json_encode(server($ARR["action"], $ARR["data"]));

function server($action, $data) {
    switch($action) {
        case "getLanguages":
            return array(
                "status" => "ok",
                "languages" => array("it", "en")
            );
            
        default:
            return array(
                "status" => "ko",
                "description" => "No valid action"
            );
    }
}