var mongoose = require('mongoose')
    , User = mongoose.model('User');


// CREATE
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

// RETRIEVE
// Get all users
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
}

// Get 1 user
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
        });
}


// UPDATE
exports.update = function(req, res) {

    console.log('Updating....\n', req.body);
    
    var conditions = req.params._id
        , update = {
            username: req.body.doc.username || '',
            realname: req.body.doc.realname || '',
            password: req.body.doc.password || ''
        }
        , options = {multi: false}
        , callback = function(err, doc) {
            updateGroupsWithUser(err, req, res, req.body.groups, doc);
        };


    User
        .findByIdAndUpdate(conditions, update, options, callback);
}


// DELETE
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