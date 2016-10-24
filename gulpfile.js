'use strict';

const gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    concat = require('gulp-concat');
    
const nm = './node_modules/';

gulp.task('js', function() {
  gulp.src('builds/development/app/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('builds/dist/app/'));
});

gulp.task('html', function() {
  gulp.src('builds/development/**/*.html')
    .pipe(gulp.dest('builds/dist/'))
});


gulp.task('watch', function() {
  gulp.watch('builds/development/app/**/*.js', ['js']);
  gulp.watch('builds/development/**/*.html', ['html']);
});

gulp.task('libs', function() {


  gulp.src([nm+'angular/angular.js',
            nm+'wikidata-sdk/dist/wikidata-sdk.js',
            nm+'angular-route/angular-route.js',
            'builds/development/lib/*.js'
        ])
    .pipe(concat('angular.concat.js'))
    .pipe(gulp.dest('./builds/dist/libs/'));
});

gulp.task('webserver', function() {
  gulp.src('builds/dist/')
      .pipe(webserver({
        livereload: true,
        open: true
      }));
});

gulp.task('default', [
  'libs',
  'html',
  'js',
  'webserver',
  'watch'
]);
