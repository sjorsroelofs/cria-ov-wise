var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var travelerSchema = Schema({
    _id: {type: Schema.Types.ObjectId, ref: "Traveler"}
});

var schemaName = Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String},
    registrationDate: {type: Date, default: Date.now},
    travelers: [travelerSchema]
});


//schemaName.path('password').validate(function(val) {
//    return (val !== undefined && val !== null && val.length >= 6);
//}, 'Password must be longer than 5 characters');

//schemaName.path('email').validate(function (email) {
//    var emailRegex = '/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/';
//    return emailRegex.test(email.text);
//}, 'Email must be valid.');


var modelName = "Mentor";
var collectionName = "mentors";
mongoose.model(modelName, schemaName, collectionName);