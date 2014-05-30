
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
        .when('/travel/:_id', {
            templateUrl: 'pages/travel/travel.html',
            controller: 'travelController'
        })

        // Travel
        .when('/help', {
            templateUrl: 'pages/help.html',
            controller: 'emergencyController'
        })

        // Redirect to home
        .otherwise({
            redirectTo: '/'
        })

    ;

});

travelerApp.controller('routesController', function($scope, $location) {

    checkIfUserIsVerified($location);

    $scope.routes = [
        { _id: 'asdasd', name: 'Route 1' },
        { _id: 'asdase', name: 'Route 2' },
        { _id: 'asdasdase', name: 'Route 3' }
    ];

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

travelerApp.controller('travelController', function($scope, $routeParams, $location) {

    checkIfUserIsVerified($location);


    initRouteGuidance();

    function initRouteGuidance() {

        // SlideToggle the section title
        jQuery('div.section div.section-title').on('click', function() {

            var section = jQuery(this).parent();

            section.find('div.section-steps').slideToggle(200, function() {
                if(section.hasClass('open')) section.removeClass('open').addClass('closed');
                else  section.removeClass('closed').addClass('open');
            });

        });

        // Go to the next section
        jQuery('div.section div.button.arrived').on('click', function() {

            var section = jQuery(this).parent().parent();
            var nextSection = section.next('div.section');

            finishSection(section);

            if(nextSection.hasClass('section')) activateSection(nextSection);
            else finish();

        });

        // Finish a section
        function finishSection(section) {

            section.find('div.section-steps').slideToggle(200, function() {
                section.removeClass('open current').addClass('closed finished');
            });

        }

        // Activate a section
        function activateSection(section) {

            if(section.hasClass('closed')) {
                section.find('div.section-steps').slideToggle(200, function() {
                    callback();
                });
            } else {
                callback();
            }

            function callback() {
                section.removeClass('closed').addClass('open current');
            }

        }

        // Finish the route
        function finish() {
            alert('Finished!');
        }

    }

});

travelerApp.controller('emergencyController', function($scope, $location, travelersService) {

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