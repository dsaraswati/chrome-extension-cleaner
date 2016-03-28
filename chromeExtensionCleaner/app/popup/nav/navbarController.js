(function(angular) {
    'use strict';
    angular
        .module('jstube.chromeExtensionCleaner.popup')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['appStatic'];
    function NavbarController(appStatic) {
        this.appStatic = appStatic;
    }    
} (window.angular));