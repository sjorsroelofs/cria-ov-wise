var mongoose = require('mongoose'),
    User = mongoose.model('User');


/**
 * Create a user
 * @param req
 * @param res
 */
exports.create = function(req, res) {

    console.log('CREATE user.');

    var doc = new User(req.body);

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
 * Get all users
 * @param req
 * @param res
 */
exports.list = function(req, res) {
    var conditions, fields, options;

    console.log('GET users.');

    conditions = {};
    fields = {};
    sort = {'registrationDate': -1};
    
    User
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
 * Get 1 user
 * @param req
 * @param res
 */
exports.detail = function(req, res) {
    var conditions, fields, options, retDoc, i, j, groupDoc;
    
    console.log('GET user with id ' + req.params._id);
    
    conditions = req.params._id
        , fields = {}
        , options = {'registrationDate': -1};
    
    User
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
 * Update a user
 * @param req
 * @param res
 */
exports.update = function(req, res) {

    console.log('Updating....');
    
    var conditions = req.params._id
        , update = {
            firstname: req.body.doc.firstname || '',
            lastname: req.body.doc.lastname || '',
            username: req.body.doc.username || '',
            email: req.body.doc.username || '',
            phone: req.body.doc.phone || '',
            password: req.body.doc.password || ''
        }
        , options = {multi: false}
        , callback = function(err, doc) {};


    User
        .findByIdAndUpdate(conditions, update, options, callback);
}


/**
 * Delete a user
 * @param req
 * @param res
 */
exports.delete = function(req, res) {
    var conditions, callback, retObj;
    
    console.log('Deleting user. ', req.params._id);
    
    conditions = {_id: req.params._id}
        , callback = function(err, doc) {
        
            retObj = {
                meta: {"action": "delete", 'timestamp': new Date(), filename: __filename},
                doc: doc,
                err: err
            };
            
            return res.send(retObj);
            
        }
        
    User.remove(conditions, callback);
}