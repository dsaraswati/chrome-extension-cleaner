(function(angular) {
    'use strict';
    angular
        .module('jstube.chromeExtensionCleaner.popup')
        .directive('jstubeNavbar', jstubeNavbar);

    function jstubeNavbar() {
        return {
            restrict: 'E',
            templateUrl: 'nav/_navbar.html',
            controller: 'NavbarController',
            controllerAs: 'nav'
        };
    }
} (window.angular));