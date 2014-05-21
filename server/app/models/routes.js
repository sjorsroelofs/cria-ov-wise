var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var routeSchema = new Schema({
    name: { type: String, required: true },
    //startpoint: { type: int, required: true },
    endpoint: { type: int, required: true },
    //distance: { type: int }
})

routeSchema.path('name').validate(function(val){
    return(val.length > 40 && val !== undefined && val !== null);
}, '');


var modelName = "Route";
var collectionName = "routes";
mongoose.model(modelName, routeSchema, collectionName);
