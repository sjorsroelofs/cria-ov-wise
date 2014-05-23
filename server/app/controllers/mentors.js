var mongoose = require('mongoose'),
    Mentor = mongoose.model('Mentor');


/**
 * Create a Mentor
 * @param req
 * @param res
 */
exports.create = function(req, res) {

    console.log('CREATE Mentor.');

    var doc = new Mentor(req.body);

    doc.save(function(err) {

        var retObj = {
            meta: {"action": "create", 'timestamp': new Date(), filename: __filename},
            doc: doc,
            err: err
        };

        return res.send(retObj);

    });

}

/**
 * Get all Mentors
 * @param req
 * @param res
 */
exports.list = function(req, res) {
    var conditions, fields, options;

    console.log('GET Mentors.');

    conditions = {};
    fields = {};
    sort = {'registrationDate': -1};

    Mentor
        .find(conditions, fields, options)
        .sort(sort)
        .exec(function(err, doc) {
            var retObj = {
                meta: {"action": "detail", 'timestamp': new Date(), filename: __filename},
                doc: doc,
                err: err
            };

            return res.send(retObj);
        })
    ;
}

/**
 * Get 1 Mentor
 * @param req
 * @param res
 */
exports.detail = function(req, res) {
    var conditions, fields, options, retDoc, i, j, groupDoc;

    console.log('GET Mentor with id ' + req.params._id);

    conditions = req.params._id
        , fields = {}
        , options = {'registrationDate': -1};

    Mentor
        .findById(conditions, fields, options)
        .populate("Traveler")
        .exec(function(err, doc) {

            var travelers = [];

            if(doc.travelers) {
                for (i = 0; i < doc.travelers.length; i++) {
                    travelers.push(doc.travelers[i]._id + "");
                }
            }

            // Find travelers for Mentor
            Traveler
                .find({}, function(err, travelersDoc) {
                    retDoc = [];
                    for(i = 0; i < travelersDoc.length; i++) {
                        travelerDoc = {
                            _id: travelersDoc[i]._id,
                            name: travelersDoc[i].name,
                            isMember: false
                        };

                        if (travelers.indexOf(travelersDoc[i]._id + "") >= 0) {
                            travelerDoc.isMember = true;
                        }
                        retDoc.push(travelerDoc);
                    }

                    var retObj = {
                        meta: {"action": "detail", 'timestamp': new Date(), filename: __filename},
                        doc: doc,
                        groups: retDoc,
                        err: err
                    };

                    return res.send(retObj);
                })
            ;
        })
    ;
}


// Nested callback for $addToSet
function updateMentorsWithTraveler(err, req, res, travelers, doc) {
    var traveler;

    if (!travelers || travelers.length === 0) {

        // Return if no array or empty array (consider alternative $pullAll)
        var retObj = {
            fields: {},
            meta: {"action": "update", 'timestamp': new Date(), filename: __filename},
            doc: doc[0],
            err: err
        };
        return res.send(retObj);
    } else {
        // Get first element from travelers array.
        traveler= travelers.pop();

        // Check if traveler has to be added or excluded from travelers based on attribute "isMember"
        if (traveler.isMember) {
            // Add to set
            Traveler
                .update({_id: doc._id}, {$addToSet: {"travelers": traveler}}, function (res1) {
                    updateMentorsWithTraveler(err, req, res, travelers, doc);
                });
        } else {
            // Remove from set
            Traveler
                .update({_id: doc._id}, {$pull: {"travelers": traveler}}, function (res1) {
                    updateMentorsWithTraveler(err, req, res, travelers, doc);
                });
        }
    }
}



/**
 * Update a Mentor
 * @param req
 * @param res
 */
exports.update = function(req, res) {
    var conditions, callback, retObj;

    console.log('Updating....');

    conditions = req.params._id,
        update = {
            firstname: req.body.doc.firstname || '',
            lastname: req.body.doc.lastname || '',
            username: req.body.doc.username || '',
            email: req.body.doc.email || '',
            password: req.body.doc.password || '',
            phone: req.body.doc.phone || ''
        },
        options = {multi: false},
        callback = function(err, doc) {
            updateMentorsWithTraveler(err, req, res, req.body.travelers, doc);
        };

    Mentor.findByIdAndUpdate(conditions, update, options, callback);
}


/**
 * Delete a Mentor
 * @param req
 * @param res
 */
exports.delete = function(req, res) {
    var conditions, callback, retObj;

    console.log('Deleting Mentor. ', req.params._id);

    conditions = {_id: req.params._id}
        , callback = function(err, doc) {

        retObj = {
            meta: {"action": "delete", 'timestamp': new Date(), filename: __filename},
            doc: doc,
            err: err
        };

        return res.send(retObj);

    }

    Mentor.remove(conditions, callback);
}