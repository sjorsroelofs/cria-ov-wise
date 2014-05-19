module.exports = function(app) {

    // TEST
    app.get('/test', function(req, res) {
    
        console.log('Arrived at test!');
        return res.send({'test': true});
        
    });

}
