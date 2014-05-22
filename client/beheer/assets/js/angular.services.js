'use strict';

angular.module('mentorApp.services', ['ngResource'])

    .factory('usersService', ['$resource', '$http',

         function ($resource) {
             var actions = {
                 'get': {method: 'GET'},
                 'save': {method: 'POST'},
                 'update': {method: 'PUT'},
                 'query': {method: 'GET', isArray: true},
                 'delete': {method: 'DELETE'}
             },
             db = {};

             db.users = $resource('/users/:_id', {}, actions);

             return db;
         }

    ])

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

            db.mentors= $resource('/mentors/:_id', {}, actions);

            return db;
        }

    ])

;