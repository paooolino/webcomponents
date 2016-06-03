<?php
    include("config.php");
    include("DB.php");
    include("DataEngine.php");
    
    $db = new \CMS\DB(\CMS\DB_HOST, \CMS\DB_NAME, \CMS\DB_USER, \CMS\DB_PASS);
    $de = new \CMS\DataEngine($db);
    
    // read raw post data
    $json = file_get_contents('php://input');
    $ARR = json_decode($json, true);  

    $action = isset($ARR["action"]) ? $ARR["action"] : "";
    $data = isset($ARR["data"]) ? $ARR["data"] : "";
    
    switch($action) {
        
        case "login":
            $authcode = $de->auth(
                $ARR["data"]["username"], 
                $ARR["data"]["password"]
            );
            if( $authcode == "" ) {
                echo json_encode(array(
                    "status" => "ko",
                    "error" => "Username or password not valid."
                ));
            } else {
                echo json_encode(array(
                    "status" => "ok",
                    "authcode" => $authcode
                ));
            }
            break;
        
        case "getLangInfos":
            $options = $de->getOptions();
            
            echo json_encode(array(
                "status" => "ok",
                "langInfos" => $options["langInfos"]
            ));
            break;
            
        case "fetchItems":
            $items = $de->fetchItems(
                $ARR["data"]["id_parent"],
                $ARR["data"]["lang"]/*,
                $ARR["data"]["offset"],
                $ARR["data"]["howmany"],
                $ARR["data"]["filter"],
                $ARR["data"]["search"],
                $ARR["data"]["orderby"]*/
            );
            echo json_encode(array(
                "status" => "ok",
                "items" => $items,
                "parent" => $de->fetchItem($ARR["data"]["id_parent"])
            ));
            break;
            
        case "saveItemField":
            $result = $de->saveItemField(                
                $ARR["data"]["id"],
                $ARR["data"]["name"],
                $ARR["data"]["value"]
            );
            if( $result == 0 ) {
                echo json_encode(array(
                    "status" => "ko",
                    "error" => "Data not modified."
                ));               
            } else {
                echo json_encode(array(
                    "status" => "ok"
                ));
            }
            break;
            
        case "fetchItem":
            echo json_encode($de->fetchItem(
                $ARR["data"]["id"]
            ));
            break;
            
        case "addItem":
            echo json_encode($de->addItem(
                $ARR["data"]["id_parent"],
                $ARR["data"]["lang"]
            ));
            break;
            
        case "deleteItem":
            echo json_encode($de->deleteItem(                
                $ARR["data"]["id"]
            ));
            break;
            
        case "dumb_checklogin":
            break;
            
        default:
            echo json_encode(array(
                "status" => "ko",
                "error" => "No valid action"
            ));
    }
    
    
if( false ) {
    $key = "example_key";
    $token = array(
        "iss" => "http://example.org",
        "aud" => "http://example.com",
        "iat" => 1356999524,
        "nbf" => 1357000000
    );
    
    /**
     * IMPORTANT:
     * You must specify supported algorithms for your application. See
     * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
     * for a list of spec-compliant algorithms.
     */
    $jwt = JWT::encode($token, $key);
    echo $jwt;
    
    $decoded = JWT::decode($jwt, $key, array('HS256'));
    print_r($decoded);
    
    /*
     NOTE: This will now be an object instead of an associative array. To get
     an associative array, you will need to cast it as such:
    */
    
    $decoded_array = (array) $decoded;
    
    /**
     * You can add a leeway to account for when there is a clock skew times between
     * the signing and verifying servers. It is recommended that this leeway should
     * not be bigger than a few minutes.
     *
     * Source: http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#nbfDef
     */
    JWT::$leeway = 60; // $leeway in seconds
    $decoded = JWT::decode($jwt, $key, array('HS256'));
}    
