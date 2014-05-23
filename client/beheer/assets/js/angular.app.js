
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

        // Badges
        .when('/badges', {
            templateUrl: 'pages/badges/list.html',
            controller: 'badgeController'
        })
        .when('/badges/create', {
            templateUrl: 'pages/badges/create.html',
            controller: 'badgeCreateController'
        })
        .when('/badges/:_id', {
            templateUrl: 'pages/badges/detail.html',
            controller: 'badgeController'
        })
        
    ;
    
});

mentorApp.controller('mainController', function($scope) {
    $scope.helloMessage = 'Hello world!';
});

mentorApp.controller('testController', function($scope) {
    $scope.testMessage = 'Testjee!';
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

        console.log($scope.mentors);

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

mentorApp.controller('badgeController', function($scope, $http, $location, $routeParams, badgesService) {

    // GET all badges
    $scope.badges= badgesService.badges.get({_id: $routeParams._id}, function () {
        console.log('$scope.badges', $scope.badges);
    });

    // UPDATE badge
    $scope.update = function () {
        console.log('Entering update');
        badgesService.badges.update({_id: $scope.badges.doc._id}, $scope.badges, function (res) {});
    }

    $scope.delete = function () {
        badgesService.badges.delete({_id: $routeParams._id});
        $location.path('/badges');
    }

});

mentorApp.controller('badgeCreateController', function($scope, $http, $location, $routeParams, badgesService) {

    // CREATE badge
    $scope.save = function () {
        console.log('Entering save from badgeCreateController');
        badgesService.badges.save({}, $scope.badges.doc, function (res) {
            if (res.err === null) {
                $location.path('/badges/' + res.doc._id);
            } else {
                $scope.save.createStatus = false;
            }
        });
    }

});