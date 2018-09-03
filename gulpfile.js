// 'use strict';

var gulp = require('gulp');
var wrench = require('wrench');
var protractor = require("gulp-protractor").protractor;

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build'); 
});



// gulp.src(["./src/tests/*.js"])
//     .pipe(protractor({
//         configFile: "e2e/protractor.config.js",
//         args: [
//             '--baseUrl', 'http://127.0.0.1:8000',
//             '--suite', 'login',
//             '--params.environment', 'test'
//         ]
//     }))
//        .on('error', function(e) { throw e })


// var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var paths = gulp.paths;
// Downloads the selenium webdriver
//gulp.task('webdriver-update', $.protractor.webdriver_update);
//gulp.task('webdriver-standalone', $.protractor.webdriver_standalone);
function runProtractor(done) {
  gulp.src('./src/tests/*.js')
    .pipe($.protractor.protractor({
      configFile: 'e2e/protractor.config.js'
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    })
    .on('end', function () {
      // Close browser sync server
      browserSync.exit();
      done();
    });
}
gulp.task('protractor', ['protractor:src']);
gulp.task('protractor:src', ['serve:e2e'], runProtractor);
// gulp.task('protractor:src', ['serve:e2e', 'webdriver-update'], runProtractor);
//gulp.task('protractor:dist', ['serve:e2e-dist', 'webdriver-update'], runProtractor);