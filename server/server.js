/**
 * Setup
 */
var express = require('express'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    env = process.env.NODE_ENV || 'development',
    config = require('./config/config.js')[env];

var app = express();


/**
 * Configuration
 */
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser);
app.set('port', process.env.PORT || config.port);


/**
 * Models
 */
var models_path = __dirname + '/app/models'
    , model_files = fs.readdirSync(models_path);
    
model_files.forEach(function (file) {
    if(file !== '.DS_Store') {
        require(models_path + '/' + file);
    }
});


/**
 * Routes
 */
var routes_path = __dirname + '/routes',
    route_files = fs.readdirSync(routes_path);

route_files.forEach(function (file) {
    if(file !== '.DS_Store') {
        require(routes_path + '/' + file)(app);
    }
});


/**
 * Run the server
 */
app.listen(app.get('port'));
console.log('Server running on port ' + app.get('port'));
