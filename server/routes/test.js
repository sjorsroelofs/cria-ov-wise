module.exports = function(app) {

    // TEST
    app.route('/test')

        .get(function(req, res) {
            return res.send({'test': true});
        })
        
    ;

}