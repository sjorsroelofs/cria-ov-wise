module.exports = function(app) {

    var controller = require('../app/controllers/ovdata.js');

    // Get one route
    app.route('/ovdata/:start/:destination').get(controller.detail);

}