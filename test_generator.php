<?php 
$actionTypes = array(
    "LOGIN" => array(
        "type" => "async",
        "creator" => "login",
        "serverData" => array(
            "authCode" => "'whatever_auth_code'"
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
            "languages" => "['it', 'en']"
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
$code .= import("expect", "expect");
$code .= import("configureMockStore", "redux-mock-store");
$code .= import("thunkMiddleware", "redux-thunk");
$code .= import("nock", "nock");
$code .= emptyrow();
$code .= import("* as creators", "../src/actionCreators");
$code .= import("* as types", "../src/actionTypes");
$code .= emptyrow();
$code .= "const middlewares = [thunkMiddleware];\r\n";
$code .= "const mockStore = configureMockStore(middlewares);\r\n";
$code .= emptyrow();
$code .= "const ENDPOINT_HOST = 'http://127.0.0.1';\r\n";
$code .= "const ENDPOINT_PATH = '/webcomponents/server/src/endpoint.php';\r\n";
$code .= emptyrow();
$code .= describeBegin(0, "[actionCreators_spec]");
foreach($actionTypes as $actionName => $actionConfig) {
    if( isset($actionConfig["type"]) && $actionConfig["type"] == "async" ) {
        // async action
        $code .= describeBegin(1, $actionName);
        
        $code .= testActionCreator(2, $actionName . "_REQUEST", $actionConfig["creator"] . "Request");
        $code .= testActionCreator(2, $actionName . "_FAILURE", $actionConfig["creator"] . "Failure", array(
            "inputs" => array(
                "serverErrorMessage" => "'Whatever error message'"
            ),
            "outputs" => array(
                "errorMessage" => "'Login failure: Whatever error message'"
            )
        ));
        $code .= testActionCreator(2, $actionName . "_SUCCESS", $actionConfig["creator"] . "Success", array(
            "inputs" => $actionConfig["serverData"],
            "outputs" => $actionConfig["serverData"]
        ));
        
        $code .= describeEnd(1);
    } else {
        // sync action
        $code .= testActionCreator(1, $actionName, $actionConfig["creator"]);
    }
}
$code .= describeEnd(0);
echo $code;










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
    if( isset($opts["inputs"]) ) {
        $attrs = array();
        foreach($opts["inputs"] as $k => $v) {
            array_push($attrs, "$k: $v");
        }
        $code .= rawrow($level+1, "const serverData = {" . implode(",", $attrs) . "};");
    }
    $code .= rawrow($level+1, "const action = creators.$creator();");
    $code .= expect($level+1, "action", "toEqual", "{type: types.$actionName}");
    $code .= itEnd($level);
    
    return $code;
}
