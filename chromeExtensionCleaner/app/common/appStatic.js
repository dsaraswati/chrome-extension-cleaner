(function(angular) {
    'use strict';
    angular
        .module('jstube.chromeExtensionCleaner.common')
        .factory('appStatic', appStatic);

    function appStatic() {
        var factory = {
            get title() {
                return 'Chrome Extension Cleaner';
            },
            get description() {
                return [
                    'Got some buggy extension installed in your Chrome browser that you are not able to remove?',
                    'Chrome Extension Cleaner will help you list all such extensions and you may remove them using a simple click.',
                    'Lets get started :)'
                ];
            },
            get searchLabel() {
                return 'Search';
            },
            get searchDescriptionLabel() {
                return 'To Search for all extensions on Chrome browser, click the Search button below';
            },
            get appListLabel() {
                return 'List of Apps and extensions installed on Chrome browser';
            },
            get noPermission() {
                return 'Additional Permissions Required';
            }
        };

        return factory;
    }
}(window.angular));