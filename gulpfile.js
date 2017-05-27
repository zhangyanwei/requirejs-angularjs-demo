var gulp = require('gulp'),
    templateCache = require('gulp-angular-templatecache'),
    less = require('gulp-less'),
    path = require('path'),
    replace = require('gulp-replace');

function compileLess(src, dirs) {
    var pipeline = gulp.src(src)
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }));
    dirs.forEach(function(dir) {
        pipeline = pipeline.pipe(gulp.dest(dir));
    });
    return pipeline;
}

gulp.task('less-main', function () {
    return compileLess('src/less/demo.less', ['src/css', 'build/css']);
});

gulp.task('less', ['less-main']);

gulp.task('compress', function () {
    return gulp.src('src/views/**/*.html')
        .pipe(templateCache('template.js', {
            module: 'app.template',
            root: 'views/',
            standalone: true,
            templateHeader: 'define([\'angular\'], function() { \'use strict\'; angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {',
            templateBody: '$templateCache.put("<%= url %>",\'<%= contents %>\');',
            templateFooter: '}]);});'
        }))
        .pipe(gulp.dest('build/js/app'));
});

gulp.task('watch-less', function () {
    return gulp.watch('src/less/**/*.less', ['less']);
});

gulp.task('update-version', function () {
    gulp.src(['build/index.html'])
        .pipe(replace(/([\?'"])v=[^'"]+/g, '$1v=' + Math.ceil(new Date().getTime() / 1000)))
        .pipe(gulp.dest('build'));
});

// DO NOT depends on the watch-less task, the default task will only for build,
// and the watch-less also just generate the css into src folder.
gulp.task('default', ['compress', 'less']);