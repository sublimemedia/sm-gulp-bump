'use strict';
var tagVersion = require('gulp-tag-version');
var filter = require('gulp-filter');
var Promise = require('bluebird');
var inquirer = require('inquirer');
exports = module.exports = function (gulp, logger) {
  var log = logger || console;
    return new Promise(function (resolve, reject) {
      log.info('Tagging commit.');
      gulp.src(['./package.json'])
        .pipe(filter('package.json'))
        .pipe(tagVersion())
        .on('error', function (err) {
          log.error('Error tagging version: ', err);
          reject(err);
        })
        .on('end', function () {
          resolve(true);
        });
    });
};
