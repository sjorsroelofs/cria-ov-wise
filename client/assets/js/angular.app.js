
var travelerApp = angular.module('travelerApp', ['ngRoute', 'travelerApp.services']);

travelerApp.config(function($routeProvider) {
    $routeProvider

        // Home
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })

        // Login
        .when('/login', {
            templateUrl: 'pages/login/login.html',
            controller: 'loginController'
        })

        // Travel
        .when('/travel', {
            templateUrl: 'pages/travel/travel.html',
            controller: 'travelController'
        })

        // Redirect to home
        .otherwise({
            redirectTo: '/'
        })

    ;

});

travelerApp.controller('mainController', function($scope, $location) {

    checkIfUserIsVerified($location);

    $scope.helloMessage = 'Hello world!';

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

travelerApp.controller('travelController', function($scope) {

});

function checkIfUserIsVerified(locationObject) {
    if(localStorage['userVerified'] !== 'true') {
        locationObject.path("/login");
    }

    return;
}