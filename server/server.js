var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var env = process.env.NODE_ENV || 'development',
    config = require('./config/config.js')[env];


var app = express();


app.use(bodyParser);
app.set('port', process.env.PORT || config.port);
app.use(express.static(__dirname + '../client/'));


app.listen(app.get('port'));
console.log('Server running on port ' + app.get('port'));