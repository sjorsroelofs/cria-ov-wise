
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
                $location.path('/');
            } else {
                localStorage['userVerified'] = false;
                alert('De ingevoerde code is niet juist');
            }
        });

    }

});


travelerApp.controller('logoutController', function($scope, $location) {

    localStorage['userVerified'] = false;
    $location.path("/");

});

travelerApp.controller('travelController', function($scope, $routeParams, $location) {

    checkIfUserIsVerified($location);

    console.log('Getting route with ID ' + $routeParams._id);

});

/**
 * Check if the user is verified. If not, redirect to the login page
 * @param locationObject
 */
function checkIfUserIsVerified(locationObject) {

    if(localStorage['userVerified'] !== 'true') {
        locationObject.path("/login");
    }

    return;

}