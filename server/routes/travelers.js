module.exports = function(app) {

    var controller = require('../app/controllers/travelers.js');

    // Create a mentor
    app.route('/travelers').post(controller.create);

    // Get all travelers
    app.route('/travelers').get(controller.list);

    // Verify if a user is valid
    app.route('/travelers/verifylogin/:_id').get(controller.verify);

    // Get one mentor
    app.route('/travelers/:_id').get(controller.detail);

    // Get one route from a traveler
    app.route('/travelers/route/:userId/:routeId').get(controller.routeDetail);

    // Update a mentor
    app.route('/travelers/:_id').put(controller.update);

    // Add a routeLog to a route
    // app.route('/travelers/routeLog/:routeId').get(controller.routeDetail);

    // Delete a mentor
    app.route('/travelers/:_id').delete(controller.delete);

}