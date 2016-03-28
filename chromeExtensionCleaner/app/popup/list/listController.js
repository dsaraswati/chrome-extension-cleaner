(function(angular) {
    'use strict';
    angular
        .module('jstube.chromeExtensionCleaner.popup')
        .controller('ListController', ListController);

    ListController.$inject = ['$scope', '$location', 'appStatic', 'extensions', 'routes'];
    function ListController($scope, $location, appStatic, extensions, routes) {
        var vm = this;

        vm.appStatic = appStatic;        
        vm.extensions = null;        
        vm.messages = {};

        var staticMessages = {
            extFetchError: 'Error while fetching extensions list.',
            extDeleteError: 'Error while deleting __.',
            extDeleteSuccess: 'Extension: __ deleted successfully.'
        };

        vm.init = function() {
            vm.extensions = extensions.getExtensionList();
            if (!vm.extensions) {
                vm.messages.error = staticMessages.extFetchError;
            }
            updateScope();
        };

        vm.goBack = function() {
            $location.path(routes.home);
        };

        vm.uninstall = function(ext) {
            extensions.uninstall(ext.id).then(extensionUninstalled);
            function extensionUninstalled(params) {
                var customization = (ext.isApp ? 'App' : 'Extension') + ': ' + ext.name;
                if (params.error) {
                    vm.messages.error = staticMessages.extDeleteError.replace('__', customization);
                } else {
                    vm.messages.info = staticMessages.extDeleteSuccess.replace('__', customization);
                }
            }
        };

        vm.init();

        function updateScope() {
            if (!$scope.$$phase) {
                $scope.$digest();
            }
        }
    }
} (window.angular));