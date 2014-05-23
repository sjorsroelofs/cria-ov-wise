module.exports = function(app) {

    var controller = require('../app/controllers/badges.js');

    // Create a badge
    app.route('/badges').post(controller.create);

    // Get all badges
    app.route('/badges').get(controller.list);

    // Get one badge
    app.route('/badges/:_id').get(controller.detail);

    // Update a badge
    app.route('/badges/:_id').put(controller.update);

    // Delete a badge
    app.route('/badges/:_id').delete(controller.delete);

}