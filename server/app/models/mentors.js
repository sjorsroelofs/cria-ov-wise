var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schemaName = Schema({
    userId: {type: Schema.Types.ObjectId, required: true}
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