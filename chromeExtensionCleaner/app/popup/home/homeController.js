(function(angular) {
    'use strict';
    angular
        .module('jstube.chromeExtensionCleaner.popup')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$location', 'appStatic', 'extensions', 'routes'];
    function HomeController($scope, $location, appStatic, extensions, routes) {
        var vm = this;
        
        vm.appStatic = appStatic;
        vm.messages = {};

        vm.listExtensions = function() {
            extensions.loadExtensionList().then(extensionsLoaded);
            function extensionsLoaded(response) {
                if (response.error) {
                    var errorMessage = 'Error while fetching extensions list';
                    console.error(errorMessage);
                    console.error(response.error);
                    vm.messages.error = errorMessage;
                } else {
                    $location.path(routes.list);
                }
            }
        };        
    }
}(window.angular));