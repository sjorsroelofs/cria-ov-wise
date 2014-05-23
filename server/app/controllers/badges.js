var mongoose = require('mongoose'),
    Badge = mongoose.model('Badge');


/**
 * Create a Badge
 * @param req
 * @param res
 */
exports.create = function(req, res) {

    console.log('CREATE Badge.');

    var doc = new Badge(req.body);

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
 * Get all Badges
 * @param req
 * @param res
 */
exports.list = function(req, res) {
    var conditions, fields, options;

    console.log('GET Badges.');

    conditions = {};
    fields = {};
    sort = {'registrationDate': -1};

    Badge
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
 * Get 1 Badge
 * @param req
 * @param res
 */
exports.detail = function(req, res) {
    var conditions, fields, options, retDoc, i, j, groupDoc;

    console.log('GET Badge with id ' + req.params._id);

    conditions = req.params._id
        , fields = {}
        , options = {'registrationDate': -1};

    Badge
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
 * Update a Badge
 * @param req
 * @param res
 */
exports.update = function(req, res) {
    var conditions, callback, retObj;

    console.log('Updating....');

    conditions = req.params._id,
        update = {
            name: req.body.doc.name || ''
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

    Badge.findByIdAndUpdate(conditions, update, options, callback);
}


/**
 * Delete a Badge
 * @param req
 * @param res
 */
exports.delete = function(req, res) {
    var conditions, callback, retObj;

    console.log('Deleting Badge. ', req.params._id);

    conditions = {_id: req.params._id}
        , callback = function(err, doc) {

        retObj = {
            meta: {"action": "delete", 'timestamp': new Date(), filename: __filename},
            doc: doc,
            err: err
        };

        return res.send(retObj);

    }

    Badge.remove(conditions, callback);
}