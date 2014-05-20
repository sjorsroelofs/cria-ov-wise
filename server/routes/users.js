module.exports = function(app) {

    var controller = require('../app/controllers/users.js');

    // Get all users
    app.route('/users').get(controller.list);
    
    // Get one user
    app.route('/users/:_id').get(controller.detail);

}