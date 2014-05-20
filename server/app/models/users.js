
var mongoose;
mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schemaName = Schema({
    username: {type: String, required: true},
    realname: {type: String, required: true},
    password: {type: String, required: true},
    registrationDate: {type: Date, default: Date.now}
});


schemaName.path('username').validate(function(val) {
    return (val !== undefined && val !== null && val.length >= 4);
}, 'Invalid username');

schemaName.path('realname').validate(function(val) {
    return (val !== undefined && val !== null && val.length >= 4);
}, 'Invalid realname');


schemaName.path('password').validate(function(val) {
    return (val !== undefined && val !== null && val.length >= 6);
}, 'Invalid password');


var modelName = "User";
var collectionName = "users";
mongoose.model(modelName, schemaName, collectionName);