var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schemaName = Schema({
    name: {type: String, required: true}
});


var modelName = "Badge";
var collectionName = "badges";
mongoose.model(modelName, schemaName, collectionName);