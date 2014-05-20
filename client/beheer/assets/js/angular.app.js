
var mentorApp = angular.module('mentorApp', ['ngRoute']);

mentorApp.config(function($routeProvider) {
    
    $routeProvider
    
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })
        
        .when('/test', {
            templateUrl: 'pages/test.html',
            controller: 'testController'
        });
    
});

mentorApp.controller('mainController', function($scope) {

    $scope.helloMessage = 'Hello world!';
    
});

mentorApp.controller('testController', function($scope) {

    $scope.testMessage = 'Testjee!';
    
});