module.exports = function(app) {

    var controller = require('../app/controllers/routes.js');

    // Create a route
    app.route('/routes').post(controller.create);

    // Get all routes
    app.route('/routes').get(controller.list);

    // Get one route
    app.route('/routes/:_id').get(controller.detail);

    // Update a badge
    app.route('/routes/:_id').put(controller.update);

    // Delete a single route
    app.route('/routes/:_id').delete(controller.delete);

}