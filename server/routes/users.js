module.exports = function(app) {

    var controller = require('../app/controllers/users.js');

    // Create a user
    app.route('/users').post(controller.create);

    // Get all users
    app.route('/users').get(controller.list);

    // Get one user
    app.route('/users/:_id').get(controller.detail);

    // Update a user
    app.route('/users/:_id').put(controller.update);

    // Delete a user
    app.route('/users/:_id').delete(controller.delete);

}