
var mentorApp = angular.module('mentorApp', ['ngRoute', 'mentorApp.services']);

mentorApp.config(function($routeProvider) {
    
    $routeProvider
    
        // Home
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
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

        // Badge data
        .when('/badgeData', {
            templateUrl: 'pages/badgeData/list.html',
            controller: 'badgeDataController'
        })
        .when('/badgeData/create', {
            templateUrl: 'pages/badgeData/create.html',
            controller: 'badgeDataCreateController'
        })
        .when('/badgeData/:_id', {
            templateUrl: 'pages/badgeData/detail.html',
            controller: 'badgeDataController'
        })

        // Routes
        .when('/routes', {
            templateUrl: 'pages/routes/list.html',
            controller: 'routeController'
        })
        .when('/routes/create', {
            templateUrl: 'pages/routes/create.html',
            controller: 'routeCreateController'
        })
        .when('/routes/:_id', {
            templateUrl: 'pages/routes/detail.html',
            controller: 'routeController'
        })

        // Redirect to home
        .otherwise({
            redirectTo: '/'
        })
        
    ;
    
});

mentorApp.controller('mainController', function($scope) {
    $scope.helloMessage = 'Hello world!';
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
    };

    $scope.delete = function () {
        mentorsService.mentors.delete({_id: $routeParams._id});
        $location.path('/mentors');
    };

    $scope.addTraveler = function () {
        var travelerBlueprint = {
            _id: ""
        };

        $scope.mentors.doc.travelers.push(travelerBlueprint);
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
    };

    $scope.delete = function () {
        travelersService.travelers.delete({_id: $routeParams._id});
        $location.path('/travelers');
    };

    $scope.addBadge = function () {
        var badgeBlueprint = {
            badgeId: ""
        };

        $scope.travelers.doc.badges.push(badgeBlueprint);
    };

    $scope.addRoute = function () {
        var routeBlueprint = {
            name: "",
            destination: ""
        };

        $scope.travelers.doc.routes.push(routeBlueprint);
    };

    $scope.addEmergencyNumber = function() {
        var numberBlueprint = {
            name: "",
            number: ""
        };

        $scope.travelers.doc.emergencyNumbers.push(numberBlueprint);
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
    $scope.badges = badgesService.badges.get({_id: $routeParams._id}, function () {
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

mentorApp.controller('routeController', function($scope, $http, $location, $routeParams, routesService) {

    // GET all routes
    $scope.routes = routesService.routes.get({_id: $routeParams._id}, function () {
        console.log('$scope.routes', $scope.routes);
    });

    // UPDATE route
    $scope.update = function () {
        console.log('Entering update');
        routesService.routes.update({_id: $scope.routes.doc._id}, $scope.routes, function (res) {});
    };

    $scope.delete = function () {
        routesService.routes.delete({_id: $routeParams._id});
        $location.path('/routes');
    }

});

mentorApp.controller('routeCreateController', function($scope, $http, $location, $routeParams, routesService) {

    // CREATE route
    $scope.save = function () {
        console.log('Entering save from routeCreateController');
        routesService.routes.save({}, $scope.routes.doc, function (res) {
            if (res.err === null) {
                $location.path('/routes/' + res.doc._id);
            } else {
                $scope.save.createStatus = false;
            }
        });
    }

});