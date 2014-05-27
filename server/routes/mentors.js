module.exports = function(app) {

    var controller = require('../app/controllers/mentors.js');

    // Create a mentor
    app.route('/mentors').post(controller.create);

    // Get all mentors
    app.route('/mentors').get(controller.list);

    // Get one mentor
    app.route('/mentors/:_id').get(controller.detail);

    // Update a mentor
    app.route('/mentors/:_id').put(controller.update);

    // Delete a mentor
    app.route('/mentors/:_id').delete(controller.delete);

}