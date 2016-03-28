describe('jstube.chromeExtensionCleaner.popup', function() {
    beforeEach(module('jstube.chromeExtensionCleaner.popup'));
    describe('NavbarController', function() {
        var $rootScope, navController;
        beforeEach(inject(function($injector, $controller) {
            $rootScope = $injector.get('$rootScope');
            navController = $controller('NavbarController', {
                $scope: $rootScope.$new()
            });
        }));
        it('should be defined as an object', function() {
            expect(navController).toBeDefined();
            expect(typeof (navController)).toBe('object');
        });
        describe('NavbarController.appStatic', function() {
            it('should be defined as an object', function() {
                expect(navController.appStatic).toBeDefined();
                expect(typeof (navController.appStatic)).toBe('object');
            });
        });
    });
});