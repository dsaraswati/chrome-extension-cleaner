(function(global) {
    'use strict';
    global.chrome = global.chrome || {};
    (function(chrome) {
        /**
         * management
         */
        chrome.management = {};
        var extList = [{
            name: 'ext 1',
            id: 'ext1'
        }, {
                name: 'ext 2',
                id: 'ext2'
            }];
        var self = {
            name: 'self ext',
            description: 'self description',
            id: 'self'
        };
        chrome.management.getAll = function(cb) {
            chrome.runtime.lastError = null;
            if (cb && typeof (cb) === 'function') {
                return cb(extList);
            }
            return 1;
        };
        chrome.management.uninstall = function(id, cb) {
            chrome.runtime.lastError = null;
            if (cb && typeof (cb) === 'function') {
                return cb();
            }
            return 1;
        };
        chrome.management.getSelf = function(cb) {
            chrome.runtime.lastError = null;
            if (cb && typeof (cb) === 'function') {
                return cb(self);
            }
            return 1;
        };
        chrome.management.uninstallSelf = function(options, cb) {
            if (cb && typeof (cb) === 'function'){
                return cb();
            }
            return 1;
        };
    } (global.chrome));
} (window));