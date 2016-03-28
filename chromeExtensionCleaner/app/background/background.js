(function(global) {
    'use strict';
    global.chromeExtensionCleaner = global.chromeExtensionCleaner || {};
    (function (chromeExtensionCleaner) {
        chromeExtensionCleaner.background = (function () {
            var factory = {};
            factory.init = function() {
                //  initialize the background
                console.log('Hi there, thanks');
            };
            return factory;
        } ());
    } (global.chromeExtensionCleaner));
} (window));