var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var routeDataSchema = new Schema({
    completed: { type: boolean, required: true }
    startTime: { type: Date, default: Date.now, required: true },
    duration: { type: int, required: true }
})

var modelName = "RouteData";
var collectionName = "routesData";
mongoose.model(modelName, routeDataSchema, collectionName);
