describe('jstube.chromeExtensionCleaner.popup', function() {
    beforeEach(module('jstube.chromeExtensionCleaner.popup'));
    describe('extensions', function() {
        var $rootScope, $httpBackend, extensions;
        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $httpBackend = $injector.get('$httpBackend');
            extensions = $injector.get('extensions');
        }));
        beforeEach(function() {
            $httpBackend
                .expectGET('home/_homePage.html')
                .respond(200);
        });
        describe('init', function() {
            it('should be defined as a function', function() {
                expect(extensions.init).toBeDefined();
                expect(typeof extensions.init).toBe('function');
            });
            it('should call api chrome.management.getSelf and handle success', function() {
                spyOn(chrome.management, 'getSelf').and.callThrough();
                spyOn(console, 'error').and.callThrough();

                extensions.init();

                expect(chrome.management.getSelf).toHaveBeenCalled();
                expect(console.error).not.toHaveBeenCalled();
            });
            it('should call api chrome.management.getSelf and handle error', function() {
                spyOn(chrome.management, 'getSelf').and.callFake(function(cb) {
                    chrome.runtime.lastError = 'some error';
                    if (cb && typeof (cb) === 'function') {
                        return cb();
                    }
                    return 1;
                });
                spyOn(console, 'error');

                extensions.init();

                expect(chrome.management.getSelf).toHaveBeenCalled();
                expect(console.error).toHaveBeenCalled();

                chrome.runtime.lastError = null;
            });
        });

        describe('loadExtensionList', function() {
            it('should be defined as a function', function() {
                expect(extensions.init).toBeDefined();
                expect(typeof (extensions.init)).toBe('function');
            });
            it('should call api chrome.management.getAll and handle success', function() {
                spyOn(chrome.management, 'getAll').and.callThrough();

                extensions.loadExtensionList().then(checkResolved);
                $rootScope.$digest();

                expect(chrome.management.getAll).toHaveBeenCalled();

                function checkResolved(obj) {
                    expect(obj).toBeDefined();
                    expect(typeof (obj)).toBe('object');
                    expect(obj.error).toBe(null);
                    expect(obj.data).toBeDefined();
                }
            });
            it('should call api chrome.management.getAll and handle error', function() {
                spyOn(chrome.management, 'getAll').and.callFake(function(cb) {
                    chrome.runtime.lastError = 'some Error';
                    if (cb && typeof (cb) === 'function') {
                        return cb();
                    }
                    return 1;
                });

                extensions.loadExtensionList().then(checkResolved);
                $rootScope.$digest();

                expect(chrome.management.getAll).toHaveBeenCalled();

                function checkResolved(obj) {
                    expect(obj).toBeDefined();
                    expect(typeof (obj)).toBe('object');
                    expect(obj.error).toBeDefined();
                    expect(obj.data).toBe(null);
                }
            });
        });
        describe('getExtensionList', function() {
            it('should be defined as a function', function() {
                expect(extensions.getExtensionList).toBeDefined();
                expect(typeof (extensions.getExtensionList)).toBe('function');
            });
            it('should return an object if loadExtensionList has been called', function() {

                extensions.loadExtensionList().then(extensionListLoaded);
                $rootScope.$digest();

                function extensionListLoaded() {
                    var extList = extensions.getExtensionList();

                    expect(extList).toBeDefined();
                    expect(typeof (extList)).toBe('object');
                }
            });
            it('should return null if extensions.loadExtensionList has not been called', function() {

                var extList = extensions.getExtensionList();

                expect(extList).toBe(null);
            });
        });
        describe('uninstall', function() {
            it('should be defined as a function', function() {
                expect(extensions.uninstall).toBeDefined();
                expect(typeof (extensions.uninstall)).toBe('function');
            });
            it('should call api chrome.management.uinstall and handle success', function() {
                spyOn(chrome.management, 'uninstall').and.callThrough();

                extensions.uninstall('some id').then(onUninstalled);
                $rootScope.$digest();

                function onUninstalled(obj) {
                    expect(obj).toBeDefined();
                    expect(typeof (obj)).toBe('object');
                    expect(obj.error).toBe(null);
                    expect(obj.data).toBe(true);
                }
            });
            it('should call api chrome.management.uinstall and handle error', function() {
                spyOn(chrome.management, 'uninstall').and.callFake(function(id, cb) {
                    chrome.runtime.lastError = 'some Error';
                    if (cb && typeof (cb) === 'function') {
                        return cb();
                    }
                    return 1;
                });

                extensions.uninstall('some id').then(onUninstalled);
                $rootScope.$digest();

                function onUninstalled(obj) {
                    expect(obj).toBeDefined();
                    expect(typeof (obj)).toBe('object');
                    expect(obj.error).toBeDefined();
                    expect(obj.data).toBe(false);

                    chrome.runtime.lastError = null;
                }
            });
        });
    });
});