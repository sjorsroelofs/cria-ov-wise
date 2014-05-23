var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schemaName = Schema({
    achievedDate: {type: Date, required: true, default: Date.now},
    travelerId: {type: Schema.Types.ObjectId},
    badgeId: {type: Schema.Types.ObjectId}
});


var modelName = "BadgeData";
var collectionName = "badgeData";
mongoose.model(modelName, schemaName, collectionName);