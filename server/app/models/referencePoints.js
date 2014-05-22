var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var referencePointSchema = new Schema({
    description: { type: String, required: true }
})

referencePointSchema.path('description').validate(function(val){
    return(val.length > 200 && val !== undefined && val !== null);
}, '');

var modelName = "ReferencePoint";
var collectionName = "referencePoints";
mongoose.model(modelName, referencePointSchema, collectionName);
