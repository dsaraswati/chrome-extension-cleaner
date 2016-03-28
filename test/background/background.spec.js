describe('chromeExtensionCleaner', function() {
    it('should expose a module/object chromeExtensionCleaner', function() {
        expect(window.chromeExtensionCleaner).toBeDefined();
        expect(typeof (window.chromeExtensionCleaner)).toBe('object');
    });
    describe('background', function() {
        it('should be defined as a module/object', function() {
            expect(window.chromeExtensionCleaner.background).toBeDefined();
            expect(typeof (window.chromeExtensionCleaner.background)).toBe('object');
        });
        describe('init', function() {
            it('should be defined as a function', function() {
                expect(window.chromeExtensionCleaner.background.init).toBeDefined();
                expect(typeof (window.chromeExtensionCleaner.background.init)).toBe('function');
            });
            it('should call console.log', function() {
                spyOn(console, 'log');

                window.chromeExtensionCleaner.background.init();                

                expect(console.log).toHaveBeenCalled();
            });
        });
    });
});