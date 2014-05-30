var mongoose = require('mongoose'),
    Route = mongoose.model('Route');

/**
 * Create a Route
 * @param req
 * @param res
 */
exports.create = function(req, res) {
    console.log('CREATE Route.');

    var doc = new Route(req.body);

    doc.save(function(err) {

        var retObj = {
            meta: {"action": "create", 'timestamp': new Date(), filename: __filename},
            doc: doc,
            err: err
        };

        return res.send(retObj);

    });
};

/**
 * Get all Routes
 * @param req
 * @param res
 */
exports.list = function(req, res) {
    var conditions, fields, options;

    console.log('GET Routes.');

    conditions = {};
    fields = {};
    sort = {'registrationDate': -1};

    Route
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
};


/**
 * Get 1 Route
 * @param req
 * @param res
 */
exports.detail = function(req, res) {
    var conditions, fields, options;

    console.log('GET Route with id ' + req.params._id);

    conditions = {_id: req.params._id}
        , fields = {}
        , options = {'registrationDate': -1};

    Route
        .find(conditions, fields, options)
        .exec(function(err, doc) {

            var retObj = {
                meta: {"action": "detail", 'timestamp': new Date(), filename: __filename},
                doc: doc[0],
                err: err
            };

            return res.send(retObj);

        })
};


/**
 * Update a Route
 * @param req
 * @param res
 */
exports.update = function(req, res) {

    console.log('Updating...');
    console.log(req.body.doc.travelers);


    var conditions =
        {_id: req.params._id}
        , update = {
            name: req.body.doc.name || '',
            destination: req.body.doc.destination || ''
        }
        , options = {multi: false}
        , callback = function(err, doc) {

            var retObj = {
                meta: {"action": "update", 'timestamp': new Date(), filename: __filename},
                doc: doc,
                err: err
            };

            return res.send(retObj);

        };

    Route.findOneAndUpdate(conditions, update, options, callback);
};


/**
 * Delete a Route
 * @param req
 * @param res
 */
exports.delete = function(req, res) {
    var conditions, callback, retObj;

    console.log('Deleting Route. ', req.params._id);

    conditions = {_id: req.params._id},
    callback = function(err, doc) {

        retObj = {
            meta: {"action": "delete", 'timestamp': new Date(), filename: __filename},
            doc: doc,
            err: err
        };

        return res.send(retObj);

    };

    Route.remove(conditions, callback);
};