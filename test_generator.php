<?php 
$actionTypes = array(
    "LOGIN" => array(
        "type" => "async",
        "creator" => "login",
        "dataToPass" => array(
            "username" => "admin",
            "password" => "admin123"
        ),
        "serverData" => array(
            "authCode" => "whatever_auth_code"
        )
    ),
    "CHANGE_FIELD_USERNAME" => array(
        "creator" => "changeFieldUsername"
    ),
    "CHANGE_FIELD_PASSWORD" => array(
        "creator" => "changeFieldPassword"
    ),
    "GET_LANGUAGES" => array(
        "type" => "async",
        "creator" => "getLanguages",
        "serverData" => array(
            "languages" => array("it", "en")
        )
    ),
    "SELECT_LANGUAGE" => array(
        "creator" => "selectLanguage"
    )
);



/*
    actionTypes_spec
*/

$code = "";
$code .= import("expect", "expect");
$code .= import("* as types", "../src/actionTypes");
$code .= emptyrow();
$code .= describeBegin(0, "[actionTypes_spec]");
foreach($actionTypes as $actionName => $actionConfig) {
    $code .= itBegin(1, "defines $actionName action type(s)");
    if( isset($actionConfig["type"]) && $actionConfig["type"] == "async" ) {
        $code .= expect(2, "types.{$actionName}_REQUEST", "toBe", "'{$actionName}_REQUEST'");
        $code .= expect(2, "types.{$actionName}_FAILURE", "toBe", "'{$actionName}_FAILURE'");
        $code .= expect(2, "types.{$actionName}_SUCCESS", "toBe", "'{$actionName}_SUCCESS'");
    } else {
        $code .= expect(2, "types.$actionName", "toBe", "'$actionName'");
    }
    $code .= itEnd(1);
}
$code .= describeEnd(0);

file_put_contents("test/actionTypes_spec.js", $code);




/*
    actionCreators_spec
*/

$code = "";
$code .= comment(0, "external imports");
$code .= import("expect", "expect");
$code .= import("configureMockStore", "redux-mock-store");
$code .= import("thunkMiddleware", "redux-thunk");
$code .= import("nock", "nock");
$code .= emptyrow();
$code .= comment(0, "internal imports");
$code .= import("* as creators", "../src/actionCreators");
$code .= import("* as types", "../src/actionTypes");
$code .= emptyrow();
$code .= comment(0, "setup");
$code .= "const ENDPOINT_HOST = 'http://127.0.0.1';\r\n";
$code .= "const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';\r\n";
$code .= "const middlewares = [thunkMiddleware];\r\n";
$code .= "const mockStore = configureMockStore(middlewares);\r\n";
$code .= emptyrow();
$code .= comment(0, "tests");
$code .= describeBegin(0, "[actionCreators_spec]");
foreach($actionTypes as $actionName => $actionConfig) {
    if( isset($actionConfig["type"]) && $actionConfig["type"] == "async" ) {
        // async action
        $code .= describeBegin(1, $actionName);
        
        $code .= testActionCreator(2, $actionName . "_REQUEST", $actionConfig["creator"] . "Request");
        $code .= testActionCreator(2, $actionName . "_FAILURE", $actionConfig["creator"] . "Failure", array(
            "inputs" => array(
                "serverErrorMessage" => "Whatever error message"
            ),
            "outputs" => array(
                "errorMessage" => "Whatever error message"
            )
        ));
        $outputs = array();
        foreach($actionConfig["serverData"] as $k => $v) {
            $outputs[$k] = $v;
        }
        $code .= testActionCreator(2, $actionName . "_SUCCESS", $actionConfig["creator"] . "Success", array(
            "inputs" => array(
                "serverData" => $actionConfig["serverData"]
            ),
            "outputs" => $outputs
        ));
        
        // async action creator
        $code .= itBegin(2, "creates the async $actionName action which passes the correct parameters to the server");
        $code .= rawrow(3, "let passedData;");
        $code .= rawrow(3, "nock(ENDPOINT_HOST).post(ENDPOINT_PATH)");
        $code .= rawrow(4, ".reply(200, function(uri, requestBody){");
        $code .= rawrow(5, "passedData = requestBody;");
        $code .= rawrow(4, "});");
        $code .= emptyrow();
        $code .= rawrow(3, "const store = mockStore({});");
        $code .= emptyrow();
        $inputsList = "";
        if( isset($actionConfig["dataToPass"]) ) {
            $inputsList = implode(", ", array_keys($actionConfig["dataToPass"]));
        }
        if( isset($actionConfig["dataToPass"]) ) {
            foreach($actionConfig["dataToPass"] as $k => $v) {
                $code .= rawrow(3, "const $k = " . json_encode($v) . ";");
            }
        }
        $code .= rawrow(3, "return store.dispatch(creators.{$actionConfig["creator"]}($inputsList))");
        $code .= rawrow(4, ".then(() => {");
        $code .= rawrow(5, "expect(passedData.action).toBe('{$actionConfig["creator"]}');");
        if( isset($actionConfig["dataToPass"]) ) {
            foreach($actionConfig["dataToPass"] as $k => $v) {
                $code .= rawrow(5, "expect(passedData.$k).toBe(" . json_encode($v) . ");");
            }
        }
        $code .= rawrow(4, "});");
        $code .= itEnd(2);
        
        $code .= describeEnd(1);
        
    } else {
        // sync action
        $code .= testActionCreator(1, $actionName, $actionConfig["creator"]);
    }
}
$code .= describeEnd(0);

file_put_contents("test/actionCreators_spec.js", $code);










function import($what, $from) {
    return "import $what from '$from';\r\n";
}

function emptyRow() {
    return "\r\n";
}

function describeBegin($level, $label) {
    return str_repeat(" ", $level*4) . "describe('$label', () => {\r\n\r\n";
}

function describeEnd($level) {
    return str_repeat(" ", $level*4) . "});\r\n\r\n";
}

function itBegin($level, $label) {
    return str_repeat(" ", $level*4) . "it('$label', () => {\r\n";
}

function itEnd($level) {
    return str_repeat(" ", $level*4) . "});\r\n\r\n";
}

function expect($level, $what, $operator, $expectation) {
    return str_repeat(" ", $level*4) . "expect($what).$operator($expectation);\r\n";
}

function rawrow($level, $code) {
    return str_repeat(" ", $level*4) . "$code\r\n";
}

function testActionCreator($level, $actionName, $creator, $opts=array()) {
    $code = "";
    $code .= itBegin($level, "creates the $actionName action");
    $inputsList = "";
    if( isset($opts["inputs"]) ) {
        $inputsList = implode(", ", array_keys($opts["inputs"]));
    }
    if( isset($opts["inputs"]) ) {
        foreach($opts["inputs"] as $k => $v) {
            $code .= rawrow($level+1, "const $k = " . json_encode($v) . ";");
        }
    }
    $outputsArr = array(str_repeat(" ", ($level+2)*4) . "type: types.$actionName");
    if( isset($opts["outputs"]) ) {
        foreach($opts["outputs"] as $k => $v) {
            array_push($outputsArr, str_repeat(" ", ($level+2)*4) . "$k: " . json_encode($v));
        }
    }
    $expectedAction = "";
    $expectedAction .= "{\r\n";
    $expectedAction .= implode(",\r\n", $outputsArr) . "\r\n";
    $expectedAction .= str_repeat(" ", ($level+1)*4) . "}";
    
    $code .= rawrow($level+1, "const action = creators.$creator({$inputsList});");
    $code .= expect($level+1, "action", "toEqual", $expectedAction);
    $code .= itEnd($level);
    
    return $code;
}

function comment($level, $s) {
    $code = "";
    $code .= str_repeat(" ", $level*4) . "/*\r\n";
    $code .= str_repeat(" ", ($level+1)*4) . $s . "\r\n";
    $code .= str_repeat(" ", $level*4) . "*/\r\n\r\n";
    return $code;
}
