
var mentorApp = angular.module('mentorApp', ['ngRoute', 'mentorApp.services']);

mentorApp.config(function($routeProvider) {
    
    $routeProvider
    
        // Home
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })
        
        // Test
        .when('/test', {
            templateUrl: 'pages/test.html',
            controller: 'testController'
        })
        
        // Users
        .when('/users', {
            templateUrl: 'pages/users/list.html',
            controller: 'userController'
        })
        .when('/users/create', {
            templateUrl: 'pages/users/create.html',
            controller: 'userController'
        })
        .when('/users/:_id', {
            templateUrl: 'pages/users/detail.html',
            controller: 'userController'
        })
        
    ;
    
});

mentorApp.controller('mainController', function($scope) {
    $scope.helloMessage = 'Hello world!';
});

mentorApp.controller('testController', function($scope) {
    $scope.testMessage = 'Testjee!';
});

mentorApp.controller('userController', function($scope, $http, $routeParams, usersService) {

    // GET all users
    $scope.users = usersService.users.get({_id: $routeParams._id}, function () {
        console.log('$scope.users', $scope.users);
    });

    // CREATE, UPDATE user
    $scope.save = function () {
        if ($scope.users.doc && $scope.users.doc._id !== undefined) {
            console.log('Entering update');
            usersService.users.update({_id: $scope.users.doc._id}, $scope.users, function (res) {
                if (res.err === null) { $scope.save.updateStatus = true; } else { $scope.save.updateStatus = false; }
            });
        } else {
            console.log('Entering save');
            usersService.users.save({}, $scope.users.doc, function (res) {
                if (res.err === null) { $scope.save.saveStatus = true; } else { $scope.save.saveStatus = false; }
            });
        }
    }

    $scope.delete = function () {
        usersService.users.delete({_id: $routeParams._id});
        $location.path('/users');
    }
    
});