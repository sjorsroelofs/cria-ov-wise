/**
 * Get a route
 * @param req
 * @param res
 */
exports.detail = function(req, res) {

    var result = {
        success: false,
        startingpoint: req.params.start,
        destination: req.params.destination,
        duration: 0,
        distance: 0,
        steps: []
    };

    console.log('Getting ov data for ' + req.params.start + ' - ' + req.params.destination);

    var data;
    if(data = getData(result.startingpoint, result.destination)) {
        result.success = true;
        result.duration = data.duration;
        result.distance = data.distance;
        result.steps = data.steps;
    }

    res.send(result);

};

function getData(startingpoint, destination) {

    var result = {
        duration: 0,
        distance: 0,
        steps: []
    };

    if(startingpoint === 'Heijenoordseweg 5 Arnhem' && destination === 'Thuvinestraat 1 Duiven') {

        result.duration = 46;
        result.distance = 18;

        result.steps.push({
            startingpoint   : 'Heijenoordseweg 5 Arnhem',
            destination     : 'Bushalte Het Dorp, Arnhem',
            departuretime   : '14:05',
            arrival         : '14:06',
            duration        : 1,
            type            : 'walking'
        });

        result.steps.push({
            startingpoint   : 'Bushalte Het Dorp, Arnhem',
            destination     : 'Bushalte Willemsplein, Arnhem',
            departuretime   : '14:06',
            arrival         : '14:18',
            duration        : 12,
            type            : 'bus',
            carrier         : 'Breng',
            stops: [
                { arrival: '14:08', name: 'Bushalte Callunastraat, Arnhem' },
                { arrival: '14:09', name: 'Bushalte Gentiaanstraat, Arnhem' },
                { arrival: '14:10', name: 'Bushalte Tormentilstraat, Arnhem' },
                { arrival: '14:11', name: 'Bushalte Van Wageningenstraat Zuid, Arnhem' },
                { arrival: '14:13', name: 'Bushalte Brouwerijweg, Arnhem' },
                { arrival: '14:14', name: 'Bushalte Van Pallandtstraat, Arnhem' },
                { arrival: '14:16', name: 'Bushalte Centraal Station (Sonsbeek), Arnhem' }
            ]
        });

        result.steps.push({
            startingpoint   : 'Bushalte Willemsplein, Arnhem',
            destination     : 'Bushalte Dorp, Duiven',
            departuretime   : '14:21',
            arrival         : '14:48',
            duration        : 27,
            type            : 'bus',
            carrier         : 'Breng',
            stops: [
                { arrival: '14:22', name: 'Bushalte Velperplein, Arnhem' },
                { arrival: '14:23', name: 'Bushalte Schouwburg, Arnhem' },
                { arrival: '14:24', name: 'Bushalte Rietgrachtstraat, Arnhem' },
                { arrival: '14:25', name: 'Bushalte Groen van Prinstererstraat, Arnhem' },
                { arrival: '14:26', name: 'Bushalte Stuyvesanthof, Arnhem' },
                { arrival: '14:27', name: 'Bushalte Dr. C. Lelyweg Noord, Arnhem' },
                { arrival: '14:29', name: 'Bushalte Blankenweg, Arnhem' },
                { arrival: '14:29', name: 'Bushalte Tunnel IJsseloord, Arnhem' },
                { arrival: '14:33', name: 'Bushalte Station Westervoort, Westervoort' },
                { arrival: '14:34', name: 'Bushalte Vredenburg, Westervoort' },
                { arrival: '14:35', name: 'Bushalte Sporthal de Pals, Westervoort' },
                { arrival: '14:36', name: 'Bushalte Sonnedach, Westervoort' },
                { arrival: '14:37', name: 'Bushalte Emmerik, Westervoort' },
                { arrival: '14:38', name: 'Bushalte Santacker, Westervoort' },
                { arrival: '14:39', name: 'Bushalte Nieuwhof, Westervoort' },
                { arrival: '14:40', name: 'Bushalte Ganzenpoel, Westervoort' },
                { arrival: '14:41', name: 'Bushalte Lange Maat, Westervoort' },
                { arrival: '14:42', name: 'Bushalte Leigraaf, Westervoort' },
                { arrival: '14:43', name: 'Bushalte Het Ambacht, Westervoort' },
                { arrival: '14:44', name: 'Bushalte Maststraat, Westervoort' },
                { arrival: '14:46', name: 'Bushalte Van Goyenstraat, Duiven' },
                { arrival: '14:47', name: 'Bushalte Thuvine, Duiven' }
            ]
        });

        result.steps.push({
            startingpoint   : 'Bushalte Dorp, Duiven',
            destination     : 'Thuvinestraat 1, Duiven',
            departuretime   : '14:48',
            arrival         : '14:51',
            duration        : 3,
            type            : 'walking'
        });

        return result;

    }

    return false;

}