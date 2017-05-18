/**
 * Created by Curso on 16/05/2017.
 */
const gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var babelify = require("babelify");
/*
gulp.task('compile-js',function() {
    return browserify('./src/js/main.js')
      /*  .transform(babelify)*/
    /*    .bundle()
        .pipe(source('all-min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});
*/
gulp.task('compile-js',function() {
    return browserify('./src/js/main.js')
        .transform(babelify,{presets: ["env"]})
        .bundle()
        .pipe(source('all-min.js'))
        .pipe(buffer())
     //   .pipe(uglify())//para minimizarlo//
        .pipe(gulp.dest('./dist/js'));
});
