module.exports = function(app) {

    var controller = require('../app/controllers/travelers.js');

    // Create a mentor
    app.route('/travelers').post(controller.create);

    // Get all travelers
    app.route('/travelers').get(controller.list);

    // Get one mentor
    app.route('/travelers/:_id').get(controller.detail);

    // Update a mentor
    app.route('/travelers/:_id').put(controller.update);

    // Delete a mentor
    app.route('/travelers/:_id').delete(controller.delete);

}