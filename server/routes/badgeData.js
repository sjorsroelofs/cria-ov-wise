module.exports = function(app) {

    var controller = require('../app/controllers/badgeData.js');

    // Create a badgeData
    app.route('/badgeData').post(controller.create);

    // Get all badgeDatas
    app.route('/badgeData').get(controller.list);

    // Get one badgeData
    app.route('/badgeData/:_id').get(controller.detail);

    // Update a badgeData
    app.route('/badgeData/:_id').put(controller.update);

    // Delete a badgeData
    app.route('/badgeData/:_id').delete(controller.delete);

}