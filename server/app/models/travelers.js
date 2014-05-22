var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schemaName = Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    userPoints: {type: Number, required: true, default: 0},
    lastGpsLocation: {type: String},
    facebookOauthToken: {type: String},
    twitterOauthToken: {type: String}
});


var modelName = "Traveler";
var collectionName = "travelers";
mongoose.model(modelName, schemaName, collectionName);