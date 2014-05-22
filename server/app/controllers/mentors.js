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
 * Update a Mentor
 * @param req
 * @param res
 */
exports.update = function(req, res) {
    var conditions, callback, retObj;

    console.log('Updating....');

    conditions = req.params._id,
        update = {
            userId: req.body.doc.userId|| ''
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