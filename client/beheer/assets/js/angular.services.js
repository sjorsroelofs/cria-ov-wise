'use strict';

angular.module('mentorApp.services', ['ngResource'])

    .factory('mentorsService', ['$resource', '$http',

        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'update': {method: 'PUT'},
                    'query': {method: 'GET', isArray: true},
                    'delete': {method: 'DELETE'}
                },
                db = {};

            db.mentors = $resource('/mentors/:_id', {}, actions);

            return db;
        }

    ])

    .factory('travelersService', ['$resource', '$http',

        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'update': {method: 'PUT'},
                    'query': {method: 'GET', isArray: true},
                    'delete': {method: 'DELETE'}
                },
                db = {};

            db.travelers = $resource('/travelers/:_id', {}, actions);

            return db;
        }

    ])

    .factory('badgesService', ['$resource', '$http',

        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'update': {method: 'PUT'},
                    'query': {method: 'GET', isArray: true},
                    'delete': {method: 'DELETE'}
                },
                db = {};

            db.badges = $resource('/badges/:_id', {}, actions);

            return db;
        }

    ])

    .factory('routesService', ['$resource', '$http',

        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'update': {method: 'PUT'},
                    'query': {method: 'GET', isArray: true},
                    'delete': {method: 'DELETE'}
                },
                db = {};

            db.routes = $resource('/routes/:_id', {}, actions);

            return db;
        }

    ])

;