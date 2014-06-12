'use strict';

angular.module('travelerApp.services', ['ngResource'])

    .factory('travelersVerifyService', ['$resource', '$http',

        function ($resource) {
            var actions = {
                    'get': {method: 'GET'}
                },
                db = {};

            db.traveler = $resource('/travelers/verifylogin/:_id', {}, actions);

            return db;
        }

    ])

    .factory('travelersService', ['$resource', '$http',

        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'update': {method: 'PUT'}
                },
                db = {};

            db.traveler = $resource('/travelers/:_id', {}, actions);

            return db;
        }

    ])

    .factory('travelerRouteService', ['$resource', '$http',

        function ($resource) {
            var actions = {
                    'get': {method: 'GET'}
                },
                db = {};

            db.route = $resource('/travelers/route/:userId/:routeId', {}, actions);

            return db;
        }

    ])

    .factory('ovdataService', ['$resource', '$http',

        function ($resource) {
            var actions = {
                    'get': {method: 'GET'}
                },
                db = {};

            db.ovdata = $resource('/ovdata/:start/:destination', {}, actions);

            return db;
        }

    ])

;