
var config = require('./config');

var fs = require('fs');
fs.writeFile("build/actionTypes.js", config, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
