(function(angular) {
    'use strict';
    angular
        .module('jstube.chromeExtensionCleaner.popup')
        .config(routeConfig)
        .config(sanitizeConfig);

    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'home/_homePage.html',
                controller: 'HomeController',
                controllerAs: 'home'
            })
            .when('/list', {
                templateUrl: 'list/_list.html',
                controller: 'ListController',
                controllerAs: 'list'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }

    sanitizeConfig.$inject = ['$compileProvider'];
    function sanitizeConfig($compileProvider) {
        var regex = /chrome:\/\/extension-icon\/.*/;
        $compileProvider.imgSrcSanitizationWhitelist(regex);
    }    
} (window.angular));