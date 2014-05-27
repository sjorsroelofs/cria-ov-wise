var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var routeSchema = Schema({

    _id: { type: Number, required: true},
    name: {type: String, required: true },
    transportType: { type: String , required: true },
    startpoint: { type: String, required: true},
    endpoint: { type: String, required: true},
//    travelStop: [travelStopSchema]
    //travelTime: {type: Number, required: true }

});

var travelStopSchema = Schema({

    _id: { type: Number, required: true},
    location: { type: String, required: true },
    //referencepointId: {type: Number, required: false}

});

// Check name field from routeSchema for valid value and length
routeSchema.path('name').validate(function(val){
    return(val.length <= 50 && val !== undefined && val !== null);
}, 'Name description is to long, undefined or value is null.');

// Check name field from travelStopSchema for valid value and length
travelStopSchema.path('location').validate(function(val){
    return(val.length <= 50 && val !== undefined && val !== null);
}, 'location description is to long, undefined or value is null.');

var modelName = "Route";
var collectionName = "routes";
mongoose.model(modelName, routeSchema, collectionName);

