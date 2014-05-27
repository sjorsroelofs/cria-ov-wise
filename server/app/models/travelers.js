var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var badgeSchema = Schema({
    badgeId: {type: Schema.Types.ObjectId, ref: "Badge"},
    achievedDate: {type: Date, required: true, default: Date.now},
});

var schemaName = Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String},
    userPoints: {type: Number, required: true, default: 0},
    lastGpsLocation: {type: String},
    facebookOauthToken: {type: String},
    twitterOauthToken: {type: String},
    registrationDate: {type: Date, default: Date.now},
    badges: [badgeSchema],
    emergencyNumbers: [{
        name: {type: String, required: true},
        number: {type: String, required: true}
    }]
});


var modelName = "Traveler";
var collectionName = "travelers";
mongoose.model(modelName, schemaName, collectionName);