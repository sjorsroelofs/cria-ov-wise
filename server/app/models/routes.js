var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var routeSchema = Schema({
    name: {type: String, required: true },
    destination: { type: String, required: true}
});

//// Check name field from routeSchema for valid value and length
//routeSchema.path('name').validate(function(val){
//    return(val.length <= 50 && val !== undefined && val !== null);
//}, 'Name description is to long, undefined or value is null.');
//
//// Check name field from travelStopSchema for valid value and length
//travelStopSchema.path('location').validate(function(val){
//    return(val.length <= 50 && val !== undefined && val !== null);
//}, 'location description is to long, undefined or value is null.');

var modelName = "Route";
var collectionName = "routes";
mongoose.model(modelName, routeSchema, collectionName);

