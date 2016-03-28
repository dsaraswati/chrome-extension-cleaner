describe('jstube.chromeExtensionCleaner.popup', function() {
    beforeEach(module('jstube.chromeExtensionCleaner.popup'));
    describe('HomeController', function() {
        var $q, $rootScope, $httpBackend, homeController, extensions, routes;
        beforeEach(inject(function($injector, $controller) {
            $q = $injector.get('$q');
            $rootScope = $injector.get('$rootScope');
            $httpBackend = $injector.get('$httpBackend');
            extensions = $injector.get('extensions');
            routes = $injector.get('routes');
            homeController = $controller('HomeController', {
                $scope: $rootScope.$new()
            });
        }));
        beforeEach(function() {
            $httpBackend
                .expectGET('home/_homePage.html')
                .respond(200);
        });
        describe('listExtensions', function() {
            it('should be defined as a function', function() {
                expect(homeController.listExtensions).toBeDefined();
                expect(typeof (homeController.listExtensions)).toBe('function');
            });
            it('should call extensions.loadExtensionList and handle success', function() {
                spyOn(extensions, 'loadExtensionList').and.callFake(function() {
                    var dfd = $q.defer();
                    dfd.resolve({
                        error: null,
                        data: [{name: 'ext 1', id: 'ext1'}]
                    });
                    return dfd.promise;
                });
                spyOn(console, 'error');
                $httpBackend.flush();
                $httpBackend
                    .expectGET('list/_list.html')
                    .respond(200);

                homeController.listExtensions();
                $rootScope.$apply();

                expect(extensions.loadExtensionList).toHaveBeenCalled();
                expect(console.error).not.toHaveBeenCalled();
            });
            it('should call extensions.loadExtensionList and handle error', function() {
                spyOn(extensions, 'loadExtensionList').and.callFake(function() {
                    var dfd = $q.defer();
                    dfd.resolve({
                        error: 'some Error',
                        data: null
                    });
                    return dfd.promise;
                });
                spyOn(console, 'error');
      
                homeController.listExtensions();
                $rootScope.$apply();

                expect(extensions.loadExtensionList).toHaveBeenCalled();
                expect(console.error).toHaveBeenCalled();
            });
        });
        describe('uninstallSelf', function() {
            it('should be defined as a function', function() {
                expect(homeController.uninstallSelf).toBeDefined();
                expect(typeof (homeController.uninstallSelf)).toBe('function');
            });
            it('should call extensions.uninstallSelf', function() {
                spyOn(extensions, 'uninstallSelf');

                homeController.uninstallSelf();

                expect(extensions.uninstallSelf).toHaveBeenCalled();                
            });
        });
    });
}); 