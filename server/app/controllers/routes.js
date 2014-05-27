var mongoose = require('mongoose')
    , Route = mongoose.model('Route');


/**
 * Create a route
 * @param req
 * @param res
 */
exports.create = function(req, res) {

    console.log('CREATE route.');

    var doc = new Route(req.body);

    doc.save(function (err) {

        var retObj = {
            meta: {"action": "create", 'timestamp': new Date(), filename: __filename},
            doc: doc,
            err: err
        };

        return res.send(retObj);

    });
}

/**
 * Get all routes
 * @param req
 * @param res
 */
exports.list = function(req, res) {
    var conditions, fields, sort;

    console.log('GET routes.');

    conditions = {};
    fields = {};
    sort = {'name': -1};

    Route
        .find(conditions, fields, sort)
        .sort(sort)
        .exec(function(err, doc) {
            var retObj = {
                meta: {"action": "detail", 'timestamp': new Date(), filename: __filename},
                doc: doc,
                err: err
            };

            return res.send(retObj);
        })
}

/**
 * Gets a single route by id
 * @param req
 * @param res
 */
exports.detail = function(req, res) {
    var conditions, fields, sort;

    console.log('GET route with id ' + req.params._id);

    conditions = {id: req.params._id}
        , fields = {}
        , sort = {'name': -1};

    Route
        .findById(conditions, fields, sort)
        .exec(function(err, doc) {
            var retObj = {
                meta: {"action": "detail", 'timestamp': new Date(), filename: __filename},
                doc: doc,
                err: err
            };

            return res.send(retObj);
        });
}

/**
 * Delete a route
 * @param req
 * @param res
 */
exports.delete = function(req, res) {
    var conditions, callback, retObj;

    console.log('Deleting route. ', req.params._id);

    conditions = {_id: req.params._id}
        , callback = function(err, doc) {

        retObj = {
            meta: {"action": "delete", 'timestamp': new Date(), filename: __filename},
            doc: doc,
            err: err
        };

        return res.send(retObj);

    }

    Route.remove(conditions, callback);
}
