'use strict';
var tagVersion = require('gulp-tag-version');
var filter = require('gulp-filter');
// var Promise = require('bluebird')
var inquirer = require('inquirer')
var git = require('gulp-git')
exports = module.exports = function (gulp, logger) {
  var log = logger || console;
  return new Promise(function (resolve, reject) {
    log.info('Tagging commit.')
    git.revParse({args:'--abbrev-ref HEAD'}, function (err, branch) {
      if (err) {
        reject(err)
      } else {
        var prefix = 'v'
        if (branch !== 'master'){
          prefix = branch + '-v'
        }
        gulp.src(['./package.json'])
        .pipe(filter('package.json'))
        .pipe(tagVersion({'prefix': prefix}))
        .on('error', function (err) {
          log.error('Error tagging version: ', err)
          reject(err)
        })
        .on('end', function () {
          resolve(true)
        })
      }
    })
  })
}
