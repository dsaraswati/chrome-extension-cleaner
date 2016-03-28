var gulp = require('gulp');
var package = require('./package.json');

var $ = require('gulp-load-plugins')({
    lazy: true
});

var banner = [
    '/**\n',
    ' * <%= pkg.name %> <%= pkg.version %>\n',
    ' * <%= pkg.description %>\n',
    //' * <%= pkg.homePage %>\n',
    ' * Copyright 2016 <%= pkg.author %>\n',
    ' * Released under the <%= pkg.license %> license.\n',
    ' */\n\n'
].join('');

var staticPath = {
    baseDir: 'chromeExtensionCleaner/',
    dist: 'dist/chromeExtensionCleaner/',
    css: 'css/',
    app: 'app/',
    img: 'img/',
    vendor: 'vendor/'
};

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('manifest', function() {

    log('Copying manifest to dist');
    return gulp
        .src(staticPath.baseDir + 'manifest.json')
        .pipe(gulp.dest(staticPath.dist));
});

gulp.task('css', function() {

    log('Copying all css to dist');
    return gulp
        .src(staticPath.baseDir + staticPath.css + '**/*.css')
        .pipe($.cssmin())
        .pipe($.banner(banner, {
            pkg: package
        }))
        .pipe(gulp.dest(staticPath.dist + staticPath.css));
});

gulp.task('img', function() {

    log('Copying all img to dist');
    return gulp
        .src(staticPath.baseDir + staticPath.img + '**/*.png')
        .pipe(gulp.dest(staticPath.dist + staticPath.img));
});

gulp.task('vendor', function() {

    log('Copying all vendor scripts to dist');
    return gulp
        .src(staticPath.baseDir + staticPath.vendor + '**/*.*')
        .pipe(gulp.dest(staticPath.dist + staticPath.vendor));
});

gulp.task('app-html', function() {

    log('Copying all html files to dist');
    var bannerHtml = banner.replace('/**', '<!--').replace(/ \* /g, '  - ').replace('*/', ' -->');
    return gulp
        .src(staticPath.baseDir + staticPath.app + '**/*.html')
        .pipe($.banner(bannerHtml, {
            pkg: package
        }))
        .pipe(gulp.dest(staticPath.dist + staticPath.app));
});

gulp.task('app-js', function() {

    log('Copying and minifying all app-js files to dist');
    return gulp
        .src(staticPath.baseDir + staticPath.app + '**/*.js')
        .pipe($.uglify())
        .pipe($.banner(banner, {
            pkg: package
        }))
        .pipe(gulp.dest(staticPath.dist + staticPath.app));
});

gulp.task('clean-dist', function() {

    log('Cleaning the dist folder for any previous builds');
    clean(staticPath.dist);
});

gulp.task('vet', function() {

    log('Analyzing js files with JSHint and JSCS');
    return gulp
        .src(staticPath.baseDir + staticPath.app + '**/*.js')
        .pipe($.jshint())
        .pipe($.jscs())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }));
});

gulp.task('build', ['manifest', 'css', 'img', 'vendor', 'app-html', 'app-js'], function() {

    log('Building the distribution version');
});

////////////////////////////////
function clean(path, done) {

    log('Cleaning: ' + $.util.colors.yellow(path));
    del(path).then(done());
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}