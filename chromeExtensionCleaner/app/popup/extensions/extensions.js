(function(angular, chrome) {
    'use strict';
    angular
        .module('jstube.chromeExtensionCleaner.popup')
        .factory('extensions', extensions);

    extensions.$inject = ['$q'];
    function extensions($q) {
        var _extensionList = null;
        var _self;

        var factory = {};
        factory.init = function() {
            chrome.management.getSelf(function(self) {
                if (chrome.runtime.lastError) {
                    console.error('Error getting self.');
                } else {
                    _self = self;
                }
            });
        };

        factory.loadExtensionList = function() {
            var dfd = $q.defer();
            chrome.management.getAll(function(extList) {
                if (chrome.runtime.lastError) {
                    dfd.resolve({
                        error: chrome.runtime.lastError,
                        data: null
                    });
                } else {
                    _extensionList = extList.filter(function(ext) {
                        return (ext.id !== _self.id);
                    });
                    dfd.resolve({
                        error: null,
                        data: _extensionList
                    });
                }
            });
            return dfd.promise;
        };

        factory.getExtensionList = function() {
            return (_extensionList);
        };

        factory.uninstall = function(extId) {
            var dfd = $q.defer();
            chrome.management.uninstall(extId, function() {
                if (chrome.runtime.lastError) {
                    dfd.resolve({
                        error: chrome.runtime.lastError,
                        data: false
                    });
                } else {
                    dfd.resolve({
                        error: null,
                        data: true
                    });
                }
                factory.loadExtensionList();
            });
            return dfd.promise;
        };

        factory.init();
        
        return factory;
    }
} (window.angular, window.chrome));