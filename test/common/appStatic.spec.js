describe('jstube.chromeExtensionCleaner.common', function() {
    beforeEach(module('jstube.chromeExtensionCleaner.common'));
    describe('appStatic', function() {
        var appStatic;
        beforeEach(inject(function($injector) {
            appStatic = $injector.get('appStatic');
        }));
        it('should be defined as an object', function() {
            expect(appStatic).toBeDefined();
            expect(typeof appStatic).toBe('object');
        });
        describe('title', function() {
            it('should have a readonly field title', function() {
                expect(appStatic.title).toBeDefined();

                var titleBeforeChange = appStatic.title;
                appStatic.title = 'new Title';

                expect(appStatic.title).toEqual(titleBeforeChange);
            });
        });
        describe('description', function() {
            it('should have a readonly field description', function() {
                expect(appStatic.description).toBeDefined();

                var descriptionBeforeChange = appStatic.description;
                appStatic.description = 'new description';

                expect(appStatic.description).toEqual(descriptionBeforeChange);
            });
        });
        describe('searchLabel', function() {
            it('should have a readonly field searchLabel', function() {
                expect(appStatic.searchLabel).toBeDefined();

                var searchLabelBeforeChange = appStatic.searchLabel;
                appStatic.searchLabel = 'new searchLabel';

                expect(appStatic.searchLabel).toEqual(searchLabelBeforeChange);
            });
        });
        describe('searchDescriptionLabel', function() {
            it('should have a readonly field searchDescriptionLabel', function() {
                expect(appStatic.searchDescriptionLabel).toBeDefined();

                var searchDescriptionLabelBeforeChange = appStatic.searchDescriptionLabel;
                appStatic.searchDescriptionLabel = 'new searchDescriptionLabel';

                expect(appStatic.searchDescriptionLabel).toEqual(searchDescriptionLabelBeforeChange);
            });
        });
        describe('appListLabel', function() {
            it('should have a readonly field appListLabel', function() {
                expect(appStatic.appListLabel).toBeDefined();

                var appListLabelBeforeChange = appStatic.appListLabel;
                appStatic.appListLabel = 'new appListLabel';

                expect(appStatic.appListLabel).toEqual(appListLabelBeforeChange);
            });
        });
        describe('noPermission', function() {
            it('should have a readonly field noPermission', function() {
                expect(appStatic.noPermission).toBeDefined();

                var noPermissionBeforeChange = appStatic.noPermission;
                appStatic.noPermission = 'new noPermission';

                expect(appStatic.noPermission).toEqual(noPermissionBeforeChange);
            });
        });
    });
});