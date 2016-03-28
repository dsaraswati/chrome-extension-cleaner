describe('jstube.chromeExtensionCleaner.popup', function() {
    beforeEach(module('jstube.chromeExtensionCleaner.popup'));
    describe('ListController', function() {
        var $q, $rootScope, $location, $httpBackend, listController, extensions;
        beforeEach(inject(function($injector, $controller) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $httpBackend = $injector.get('$httpBackend');
            listController = $controller('ListController', {
                $scope: $rootScope.$new()
            });
            extensions = $injector.get('extensions');
        }));
        describe('init', function() {
            it('should be defined as a function', function() {
                expect(listController.init).toBeDefined();
                expect(typeof (listController.init)).toBe('function');
            });
            it('should call extensions.getExtensionList and handle success', function() {
                spyOn(extensions, 'getExtensionList').and.callFake(function() {
                    return [{
                        name: 'ext 1',
                        id: 'ext1'
                    }];
                });
                // reset errors
                listController.messages.error = undefined;

                listController.init();

                expect(listController.messages.error).not.toBeDefined();
            });
            it('should call extensions.getExtensionList and handle error', function() {
                spyOn(extensions, 'getExtensionList').and.callFake(function() {
                    return null;
                });
                // reset errors
                listController.messages.error = undefined;

                listController.init();

                expect(listController.messages.error).toBeDefined();
            });
        });
        describe('goBack', function() {
            it('should be defined as a function', function() {
                expect(listController.goBack).toBeDefined();
                expect(typeof (listController.goBack)).toBe('function');
            });
            it('should call location.path to reroute to home', function() {
                $httpBackend
                    .expectGET('home/_homePage.html')
                    .respond(200);
                spyOn($location, 'path');

                listController.goBack();

                expect($location.path).toHaveBeenCalledWith('/home');
            });
        });
        describe('uninstall', function() {
            it('should be defined as a function', function() {
                expect(listController.uninstall).toBeDefined();
                expect(typeof (listController.uninstall)).toBe('function');
            });
            it('should call extensions.uninstall and handle success', function() {
                $httpBackend
                    .expectGET('home/_homePage.html')
                    .respond(200);
                spyOn(extensions, 'uninstall').and.callFake(function() {
                    var dfd = $q.defer();
                    dfd.resolve({
                        error: null,
                        data: true
                    });
                    return dfd.promise;
                });
                var uninstallExt = { id: 'ext Id', isApp: true };

                listController.uninstall(uninstallExt);
                listController.messages.error = undefined;
                listController.messages.info = undefined;
                $rootScope.$digest();

                expect(extensions.uninstall).toHaveBeenCalledWith(uninstallExt.id);
                expect(listController.messages.error).not.toBeDefined();
                expect(listController.messages.info).toBeDefined();
            });
            it('should call extensions.uninstall and handle error', function() {
                $httpBackend
                    .expectGET('home/_homePage.html')
                    .respond(200);
                spyOn(extensions, 'uninstall').and.callFake(function() {
                    var dfd = $q.defer();
                    dfd.resolve({
                        error: 'some Error',
                        data: false
                    });
                    return dfd.promise;
                });
                var uninstallExt = { id: 'ext Id' };

                listController.uninstall(uninstallExt);
                listController.messages.error = undefined;
                listController.messages.info = undefined;
                $rootScope.$digest();

                expect(extensions.uninstall).toHaveBeenCalledWith(uninstallExt.id);
                expect(listController.messages.error).toBeDefined();
                expect(listController.messages.info).not.toBeDefined();
            });
        });
    });
});