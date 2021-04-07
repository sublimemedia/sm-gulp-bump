'use strict'
const tagVersion = require('gulp-tag-version')
const filter = require('gulp-filter')
// var Promise = require('bluebird')
const inquirer = require('inquirer')
const git = require('gulp-git')
exports = module.exports = function (gulp, logger) {
  const log = logger || console
  return new Promise(function (resolve, reject) {
    log.info('Tagging commit.')
    git.revParse({ args: '--abbrev-ref HEAD' }, function (err, branch) {
      if (err) {
        reject(err)
      } else {
        let prefix = 'v'
        if (branch !== 'master') {
          prefix = branch + '-v'
        }
        gulp
          .src(['./package.json'])
          .pipe(filter('package.json'))
          .pipe(tagVersion({ prefix: prefix }))
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
