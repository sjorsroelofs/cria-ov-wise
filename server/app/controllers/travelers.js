var mongoose = require('mongoose'),
    Traveler = mongoose.model('Traveler');


/**
 * Create a Traveler
 * @param req
 * @param res
 */
exports.create = function(req, res) {

    console.log('CREATE Traveler.');

    var doc = new Traveler(req.body);

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
 * Get all Travelers
 * @param req
 * @param res
 */
exports.list = function(req, res) {
    var conditions, fields, options;

    console.log('GET Travelers.');

    conditions = {};
    fields = {};
    sort = {'registrationDate': -1};

    Traveler
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
 * Get 1 Traveler
 * @param req
 * @param res
 */
exports.detail = function(req, res) {
    var conditions, fields, options, retDoc, i, j, groupDoc;

    console.log('GET Traveler with id ' + req.params._id);

    conditions = req.params._id
        , fields = {}
        , options = {'registrationDate': -1};

    Traveler
        .findById(conditions, fields, options)
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
 * Update a Traveler
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
            phone: req.body.doc.phone || '',
            userPoints: req.body.doc.userPoints || '',
            lastGpsLocation: req.body.doc.lastGpsLocation || '',
            facebookOauthToken: req.body.doc.facebookOauthToken || '',
            twitterOauthToken: req.body.doc.twitterOauthToken || '',
            badges: req.body.doc.badges || ''
        },
        options = {multi: false},
        callback = function(err, doc) {

            retObj = {
                fields: {},
                meta: {"action": "update", 'timestamp': new Date(), filename: __filename},
                doc: doc[0],
                err: err
            };

            return res.send(retObj);

        };

    Traveler.findByIdAndUpdate(conditions, update, options, callback);
}


/**
 * Delete a Traveler
 * @param req
 * @param res
 */
exports.delete = function(req, res) {
    var conditions, callback, retObj;

    console.log('Deleting Traveler. ', req.params._id);

    conditions = {_id: req.params._id}
        , callback = function(err, doc) {

            retObj = {
                meta: {"action": "delete", 'timestamp': new Date(), filename: __filename},
                doc: doc,
                err: err
            };

            return res.send(retObj);

        }

    Traveler.remove(conditions, callback);
}


/**
 * Verify if a traveler is valid
 * @param req
 * @param res
 */
exports.verify = function(req, res) {
    var conditions, callback, retObj;

    console.log('Verifying traveler with id ' + req.params._id);

    // Get the user
    Traveler.findOne({_id: req.params._id}, function(err, doc) {
        if(!err && doc) {
            return res.send({ 'verified': true });
        } else {
            return res.send({ 'verified': false });
        }
    });

}