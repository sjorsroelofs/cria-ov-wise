
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
            controller: 'userCreateController'
        })
        .when('/users/:_id', {
            templateUrl: 'pages/users/detail.html',
            controller: 'userController'
        })

        // Mentors
        .when('/mentors', {
            templateUrl: 'pages/mentors/list.html',
            controller: 'mentorController'
        })
        .when('/mentors/create', {
            templateUrl: 'pages/mentors/create.html',
            controller: 'mentorCreateController'
        })
        .when('/mentors/:_id', {
            templateUrl: 'pages/mentors/detail.html',
            controller: 'mentorController'
        })

        // Travelers
        .when('/travelers', {
            templateUrl: 'pages/travelers/list.html',
            controller: 'travelerController'
        })
        .when('/travelers/create', {
            templateUrl: 'pages/travelers/create.html',
            controller: 'travelerCreateController'
        })
        .when('/travelers/:_id', {
            templateUrl: 'pages/travelers/detail.html',
            controller: 'travelerController'
        })
        
    ;
    
});

mentorApp.controller('mainController', function($scope) {
    $scope.helloMessage = 'Hello world!';
});

mentorApp.controller('testController', function($scope) {
    $scope.testMessage = 'Testjee!';
});

mentorApp.controller('userController', function($scope, $http, $location, $routeParams, usersService) {

    // GET all users
    $scope.users = usersService.users.get({_id: $routeParams._id}, function () {
        console.log('$scope.users', $scope.users);
    });

    // UPDATE user
    $scope.update = function () {
        console.log('Entering update');
        usersService.users.update({_id: $scope.users.doc._id}, $scope.users, function (res) {});
    }

    $scope.delete = function () {
        usersService.users.delete({_id: $routeParams._id});
        $location.path('/users');
    }
    
});

mentorApp.controller('userCreateController', function($scope, $http, $location, $routeParams, usersService) {

    // CREATE user
    $scope.save = function () {
        console.log('Entering save from userCreateController');
        usersService.users.save({}, $scope.users.doc, function (res) {
            if (res.err === null) {
                $location.path('/users/' + res.doc._id);
            } else {
                $scope.save.createStatus = false;
            }
        });
    }

});

mentorApp.controller('mentorController', function($scope, $http, $location, $routeParams, mentorsService) {

    // GET all mentors
    $scope.mentors = mentorsService.mentors.get({_id: $routeParams._id}, function () {
        console.log('$scope.mentors', $scope.mentors);
    });

    // UPDATE mentor
    $scope.update = function () {
        console.log('Entering update');
        mentorsService.mentors.update({_id: $scope.mentors.doc._id}, $scope.mentors, function (res) {});
    }

    $scope.delete = function () {
        mentorsService.mentors.delete({_id: $routeParams._id});
        $location.path('/mentors');
    }

});

mentorApp.controller('mentorCreateController', function($scope, $http, $location, $routeParams, mentorsService) {

    // CREATE mentor
    $scope.save = function () {
        console.log('Entering save from mentorCreateController');
        mentorsService.mentors.save({}, $scope.mentors.doc, function (res) {
            if (res.err === null) {
                $location.path('/mentors/' + res.doc._id);
            } else {
                $scope.save.createStatus = false;
            }
        });
    }

});

mentorApp.controller('travelerController', function($scope, $http, $location, $routeParams, travelersService) {

    // GET all travelers
    $scope.travelers = travelersService.travelers.get({_id: $routeParams._id}, function () {
        console.log('$scope.travelers', $scope.travelers);
    });

    // UPDATE traveler
    $scope.update = function () {
        console.log('Entering update');
        travelersService.travelers.update({_id: $scope.travelers.doc._id}, $scope.travelers, function (res) {});
    }

    $scope.delete = function () {
        travelersService.travelers.delete({_id: $routeParams._id});
        $location.path('/travelers');
    }

});

mentorApp.controller('travelerCreateController', function($scope, $http, $location, $routeParams, travelersService) {

    // CREATE traveler
    $scope.save = function () {
        console.log('Entering save from travelerCreateController');
        travelersService.travelers.save({}, $scope.travelers.doc, function (res) {
            if (res.err === null) {
                $location.path('/travelers/' + res.doc._id);
            } else {
                $scope.save.createStatus = false;
            }
        });
    }

});