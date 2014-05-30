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
                    'get': {method: 'GET'}
                },
                db = {};

            db.traveler = $resource('/travelers/:_id', {}, actions);

            return db;
        }

    ])

;