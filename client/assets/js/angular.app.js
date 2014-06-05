var travelerApp = angular.module('travelerApp', ['ngRoute', 'travelerApp.services']);

travelerApp.config(function($routeProvider) {
    $routeProvider

        // Home
        .when('/', {
            templateUrl: 'pages/routes.html',
            controller: 'routesController'
        })

        // Login
        .when('/login', {
            templateUrl: 'pages/login/login.html',
            controller: 'loginController'
        })

        // Logout
        .when('/logout', {
            template: "",
            controller: 'logoutController'
        })

        // Travel
        .when('/travel/:routeId', {
            templateUrl: 'pages/travel/travel.html',
            controller: 'travelController'
        })

        // Travel
        .when('/help', {
            templateUrl: 'pages/help.html',
            controller: 'emergencyController'
        })

        .when('/scores', {
            templateUrl: 'pages/scores.html',
            controller: 'scoresController'
        })

        // Redirect to home
        .otherwise({
            redirectTo: '/'
        })

    ;

});

travelerApp.controller('routesController', function($scope, $location, travelersService) {

    checkIfUserIsVerified($location);

    $scope.traveler = travelersService.traveler.get({_id: localStorage['userId']}, $scope.traveler, function (res) {
        console.log($scope.traveler);
    });

});

travelerApp.controller('loginController', function($scope, $location, travelersVerifyService) {

    $scope.verifyUser = function() {

        travelersVerifyService.traveler.get({_id: $scope.insert_userId}, $scope.traveler, function (res) {
            if(res.verified) {
                localStorage['userVerified'] = true;
                localStorage['userId'] = $scope.insert_userId;
                $location.path('/');
            } else {
                localStorage['userVerified'] = false;
                localStorage['userId'] = -1;
                alert('De ingevoerde code is niet juist');
            }
        });

    }

});


travelerApp.controller('logoutController', function($scope, $location) {

    localStorage['userVerified'] = false;
    localStorage['userId'] = -1;
    $location.path("/");

});


travelerApp.controller('travelController', function($scope, $routeParams, $location, travelersService, travelerRouteService, ovdataService) {

    var activateSection, finishSection, finish, saveGps, simulateSection, initGoogleMaps;

    checkIfUserIsVerified($location);

    setInterval(function() {
        saveGps();
    }, 20000);

    $scope.routeDetails = travelerRouteService.route.get({userId: localStorage['userId'], routeId: $routeParams.routeId}, $scope.routeDetails, function (res) {

        console.log(res);

        $scope.routeDirections = ovdataService.ovdata.get({start: 'Heijenoordseweg 5 Arnhem', destination: $scope.routeDetails.doc.destination}, $scope.routeDirections, function (res) {
            console.log(res);
        });

    });

    simulateSection = function() {

        window.setTimeout(function() {
            var sectionToSimulate    = jQuery('div.section.current');
            var sectionProgressBar   = jQuery('div.progress-bar', sectionToSimulate);
            var elementToSlide       = jQuery('div.current-position', sectionProgressBar);

            elementToSlide.animate({'margin-left': '95%'}, 40000, 'linear', function() {
                window.setTimeout(function() {
                    $scope.goToNextSection(false, sectionToSimulate);
                }, 2000);
            });

            if(sectionToSimulate.hasClass('bus') || sectionToSimulate.hasClass('train')) {
                var stepTicker        = jQuery('div.step-ticker', sectionToSimulate);
                var stepTickerInner   = jQuery('div.inner', stepTicker);

                stepTickerInner.animate({'margin-left': '-953px'}, 30000, 'linear');
            }

        }, 2000);

    };

    $scope.travelPartialLoaded = function(index, type, dest, elementId) {

        if(index === 0) {
            simulateSection(elementId);

            if(type === 'walking') {
                initGoogleMaps(dest, elementId);
            }
        }

    };

    initGoogleMaps = function(dest, elementId) {

//        var rendererOptions = { draggable: false };
//        var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
//        var directionsService = new google.maps.DirectionsService();
//        var map;
//
//        if(navigator.geolocation) {
//            navigator.geolocation.getCurrentPosition(positionCallback);
//        }
//
//        function positionCallback(position) {
//            var gps = position.coords.latitude + ", " + position.coords.longitude;
//            var centerPoint = new google.maps.LatLng(gps);
//            var mapOptions = {
//                zoom: 20,
//                center: centerPoint
//            };
//
//            map = new google.maps.Map(document.getElementById(elementId), mapOptions);
//            directionsDisplay.setMap(map);
//
//            var request = {
//                origin: gps,
//                destination: dest,
//                travelMode: google.maps.TravelMode.WALKING
//            };
//
//            directionsService.route(request, function(response, status) {
//                if (status == google.maps.DirectionsStatus.OK) {
//                    directionsDisplay.setDirections(response);
//                }
//            });
//
//        }

    };

    startRoute = function() {

        // Add a new routeLog record to the route with ID $routeParams.routeId
        //var newRouteLog = travelerRouteDataService.routeData.save({}, );

//        mentorsService.mentors.save({}, $scope.mentors.doc, function (res) {
//            if (res.err === null) {
//                $location.path('/mentors/' + res.doc._id);
//            } else {
//                $scope.save.createStatus = false;
//            }
//        });

    };

    // Slide the section title
    $scope.handleSectionTitleClick = function($event) {

        var section = jQuery($event.target).parent();

        section.find('div.section-steps').slideToggle(200, function() {
            if(section.hasClass('open')) section.removeClass('open').addClass('closed');
            else section.removeClass('closed').addClass('open');

            if(section.hasClass('walking')) {
                console.log(section.attr('data-destination'));
                initGoogleMaps(section.attr('data-destination'), section.find('.map-container').attr('id'));
            }
        });

    };

    // Go to the next section
    $scope.goToNextSection = function($event, section) {

        if(typeof section == 'undefined') var section = jQuery($event.target).parent().parent();
        var nextSection = section.next('div.section');

        finishSection(section);

        if(nextSection.hasClass('section')) {
            activateSection(nextSection);
        }
        else finish();

    };

    // Activate a section
    activateSection = function(section) {

        if(section.hasClass('closed')) {
            section.find('div.section-steps').slideToggle(200, callback);
        } else {
            callback();
        }

        function callback() {
            section.removeClass('closed').addClass('open current');
            simulateSection();
            if(section.hasClass('walking')) {
                initGoogleMaps(section.attr('data-destination'), section.find('.map-container').attr('id'));
            }
        }

    };

    // Finish a section
    finishSection = function(section) {

        section.find('div.section-steps').slideToggle(200, function() {
            section.removeClass('open current').addClass('closed finished');
        });

    };

    // Finish the route
    finish = function() {
        //alert('Finished!');
    };

    // Save the GPS location
    saveGps = function() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(savePostion);
        }

        function savePostion(position) {
            var gps = position.coords.latitude + "," + position.coords.longitude;

            travelersService.traveler.update({_id: localStorage['userId']}, { doc: { lastGpsLocation: gps } }, function (res) {
                console.log(gps);
            });
        }
    };
    saveGps();

});

travelerApp.controller('emergencyController', function($scope, $location, travelersService) {

    checkIfUserIsVerified($location);

    $scope.traveler = travelersService.traveler.get({_id: localStorage['userId']}, $scope.traveler, function (res) {
        console.log($scope.traveler);
    });

});

travelerApp.controller('scoresController', function($scope, $location, travelersService) {

    checkIfUserIsVerified($location);

    $scope.traveler = travelersService.traveler.get({_id: localStorage['userId']}, $scope.traveler, function (res) {
        console.log($scope.traveler);
    });
});

/**
 * Check if the user is verified. If not, redirect to the login page
 * @param locationObject
 */
function checkIfUserIsVerified(locationObject) {

    if(localStorage['userVerified'] !== 'true' || (localStorage['userId'] == undefined || localStorage['userId'] < 0)) {
        locationObject.path("/login");
    }

    return;

}