var express = require('express'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var env = process.env.NODE_ENV || 'development',
    config = require('./config/config.js')[env];


var app = express();


var routes_path = __dirname + '/routes',
    route_files = fs.readdirSync(routes_path);

route_files.forEach(function (file) {
    if(file !== '.DS_Store') {
        require(routes_path + '/' + file)(app);
    }
});


app.use(bodyParser);
app.set('port', process.env.PORT || config.port);
app.use(express.static(__dirname + '../client/'));


app.listen(app.get('port'));
console.log('Server running on port ' + app.get('port'));