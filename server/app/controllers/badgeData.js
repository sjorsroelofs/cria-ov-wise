var mongoose = require('mongoose'),
    BadgeData = mongoose.model('BadgeData');


/**
 * Create a BadgeData
 * @param req
 * @param res
 */
exports.create = function(req, res) {

    console.log('CREATE BadgeData.');

    var doc = new BadgeData(req.body);

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
 * Get all BadgeDatas
 * @param req
 * @param res
 */
exports.list = function(req, res) {
    var conditions, fields, options;

    console.log('GET BadgeDatas.');

    conditions = {};
    fields = {};
    sort = {'registrationDate': -1};

    BadgeData
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
 * Get 1 BadgeData
 * @param req
 * @param res
 */
exports.detail = function(req, res) {
    var conditions, fields, options, retDoc, i, j, groupDoc;

    console.log('GET BadgeData with id ' + req.params._id);

    conditions = req.params._id
        , fields = {}
        , options = {'registrationDate': -1};

    BadgeData
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
 * Update a BadgeData
 * @param req
 * @param res
 */
exports.update = function(req, res) {
    var conditions, callback, retObj;

    console.log('Updating....');

    conditions = req.params._id,
        update = {
            achievedDate: req.body.doc.achievedDate || '',
            travelerId: req.body.doc.travelerId || '',
            badgeId: req.body.doc.badgeId || ''
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

    BadgeData.findByIdAndUpdate(conditions, update, options, callback);
}


/**
 * Delete a BadgeData
 * @param req
 * @param res
 */
exports.delete = function(req, res) {
    var conditions, callback, retObj;

    console.log('Deleting BadgeData. ', req.params._id);

    conditions = {_id: req.params._id}
        , callback = function(err, doc) {

        retObj = {
            meta: {"action": "delete", 'timestamp': new Date(), filename: __filename},
            doc: doc,
            err: err
        };

        return res.send(retObj);

    }

    BadgeData.remove(conditions, callback);
}