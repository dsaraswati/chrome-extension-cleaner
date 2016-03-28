(function() {
    'use strict';
    angular
        .module('jstube.chromeExtensionCleaner.popup')
        .factory('routes', routes);

    function routes() {
        return {
            get home() {
                return '/home';
            },
            get list() {
                return '/list';
            }
        };
    }    
} (window.angular));